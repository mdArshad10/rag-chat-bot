import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { existsSync } from 'node:fs';
import path from 'node:path';

export interface GrpcClientOptions {
	protoFile: string;
	packageName: string;
	serviceName: string;
	address: string;
}

type GrpcServiceConstructor<T extends grpc.Client> = new (
	address: string,
	credentials: grpc.ChannelCredentials,
) => T;

/** Creates reusable outbound gRPC clients and owns their lifecycle. */
export class GrpcClient {
	private readonly clients = new Set<grpc.Client>();

	constructor(private readonly protoDirectory = resolveProtoDirectory()) {}

	create<T extends grpc.Client>({
		protoFile,
		packageName,
		serviceName,
		address,
	}: GrpcClientOptions): T {
		const packageDefinition = protoLoader.loadSync(
			path.join(this.protoDirectory, protoFile),
			{
				keepCase: true,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true,
			},
		);

		const packages = grpc.loadPackageDefinition(packageDefinition) as unknown as Record<
			string,
			Record<string, GrpcServiceConstructor<T>>
		>;
		const Service = packages[packageName]?.[serviceName];

		if (!Service) {
			throw new Error(
				`gRPC service ${packageName}.${serviceName} was not found in ${protoFile}`,
			);
		}

		const client = new Service(address, grpc.credentials.createInsecure());
		this.clients.add(client);
		return client;
	}

	close(): void {
		for (const client of this.clients) client.close();
		this.clients.clear();
	}
}

export const resolveProtoDirectory = (): string => {
	const protoCandidates = [
    path.resolve(import.meta.dir, '..', '..', '..', 'proto'),
    path.resolve(import.meta.dir, '..', '..', 'proto'),
];

	return protoCandidates.find((candidate) => existsSync(candidate)) ?? protoCandidates[0]!;
};
