export const correctCreateBlogInputData = {
    name: "AlbertBlog",
    description: "it's my personal blog",
    websiteUrl: "https://youtube.com/"
}

export const correctCreatedBlogViewModel = {
    id: expect.any(String),
    name: "AlbertBlog",
    description: "it's my personal blog",
    websiteUrl: "https://youtube.com/",
    isMembership: false,
    createdAt: expect.any(String),


}



export const correctBlogUpdateData = {
    name: "Anny",
    description: "Updated Blog",
    websiteUrl: "https://ggl.com/"
}

export const correctUpdatedBlogViewModel = {
    id: expect.any(String),
    name: "Anny",
    description: "Updated Blog",
    websiteUrl: "https://ggl.com/",
    isMembership: false,
    createdAt: expect.any(String),


}