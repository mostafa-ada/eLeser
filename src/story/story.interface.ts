
export interface IStory {
    uuid:String,
    title: String,
    description?: String,
    contentText?: String,
    contentUrl?: String,
    authorName?: String,
    language?: String,
    wordCount?: String,
    status?: String,
    isSaved?:boolean,
    tags?: [],
    Photo?: [],
    created_at:String,
    updated_at?:String,
    category?:[],
}