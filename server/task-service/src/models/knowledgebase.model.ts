import { model, Model, models, Schema, Types } from "mongoose";

interface IKnowledgeBase{
    userId: Types.ObjectId;
    fileName:string
}

const knowledgeBaseSchema = new Schema<IKnowledgeBase>(
    {
        fileName: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
    },
    { timestamps: true },
);

export const knowledgeBaseModel: Model<IKnowledgeBase> =
    (models.knowledgeBaseSchema as Model<IKnowledgeBase> | undefined) ?? model<IKnowledgeBase>('Agent', knowledgeBaseSchema);