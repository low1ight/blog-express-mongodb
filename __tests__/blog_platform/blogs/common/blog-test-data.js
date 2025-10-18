"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdBlogsViewModelArr = exports.correctBlogsInputDataArr = exports.correctUpdatedBlogViewModel = exports.correctBlogUpdateData = exports.correctPostForBlogInputData = exports.correctCreatedBlogViewModel = exports.correctCreateBlogInputData = void 0;
exports.correctCreateBlogInputData = {
    name: "AlbertBlog",
    description: "it's my personal blog",
    websiteUrl: "https://youtube.com/"
};
exports.correctCreatedBlogViewModel = {
    id: expect.any(String),
    name: "AlbertBlog",
    description: "it's my personal blog",
    websiteUrl: "https://youtube.com/",
    isMembership: false,
    createdAt: expect.any(String),
};
exports.correctPostForBlogInputData = {
    title: "Title",
    shortDescription: "description",
    content: "content",
};
exports.correctBlogUpdateData = {
    name: "Anny",
    description: "Updated Blog",
    websiteUrl: "https://ggl.com/"
};
exports.correctUpdatedBlogViewModel = {
    id: expect.any(String),
    name: "Anny",
    description: "Updated Blog",
    websiteUrl: "https://ggl.com/",
    isMembership: false,
    createdAt: expect.any(String),
};
//blog query test data
exports.correctBlogsInputDataArr = [
    {
        name: "TechWorld",
        description: "Technology news and articles.",
        websiteUrl: "https://techworld.com"
    },
    {
        name: "TechTalks",
        description: "Insights into modern technology.",
        websiteUrl: "https://techtalks.org"
    },
    {
        name: "TechTrends",
        description: "Latest trends in tech.",
        websiteUrl: "https://techtrends.net"
    },
    {
        name: "DevDaily",
        description: "Daily content for developers.",
        websiteUrl: "https://devdaily.dev"
    },
    {
        name: "CodeCraft",
        description: "Coding techniques and tips.",
        websiteUrl: "https://codecraft.io"
    },
    {
        name: "ByteBuzz",
        description: "Buzz around software and hardware.",
        websiteUrl: "https://bytebuzz.com"
    },
    {
        name: "TechGuru",
        description: "Guides and tutorials for tech enthusiasts.",
        websiteUrl: "https://techguru.ai"
    },
    {
        name: "Blogify",
        description: "Modern blog on various topics.",
        websiteUrl: "https://blogify.blog"
    },
    {
        name: "NextGenTech",
        description: "Exploring next generation technologies.",
        websiteUrl: "https://nextgentech.tech"
    },
    {
        name: "TheCodingTech",
        description: "Tech and code in one place.",
        websiteUrl: "https://thecodingtech.dev"
    },
    {
        name: "MiniTech",
        description: "Tiny tech blog with big ideas.",
        websiteUrl: "https://minitech.site"
    }
];
exports.createdBlogsViewModelArr = [
    {
        id: expect.any(String),
        name: "TechWorld",
        description: "Technology news and articles.",
        websiteUrl: "https://techworld.com",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "TechTalks",
        description: "Insights into modern technology.",
        websiteUrl: "https://techtalks.org",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "TechTrends",
        description: "Latest trends in tech.",
        websiteUrl: "https://techtrends.net",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "DevDaily",
        description: "Daily content for developers.",
        websiteUrl: "https://devdaily.dev",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "CodeCraft",
        description: "Coding techniques and tips.",
        websiteUrl: "https://codecraft.io",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "ByteBuzz",
        description: "Buzz around software and hardware.",
        websiteUrl: "https://bytebuzz.com",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "TechGuru",
        description: "Guides and tutorials for tech enthusiasts.",
        websiteUrl: "https://techguru.ai",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "Blogify",
        description: "Modern blog on various topics.",
        websiteUrl: "https://blogify.blog",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "NextGenTech",
        description: "Exploring next generation technologies.",
        websiteUrl: "https://nextgentech.tech",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "TheCodingTech",
        description: "Tech and code in one place.",
        websiteUrl: "https://thecodingtech.dev",
        isMembership: false,
        createdAt: expect.any(String)
    },
    {
        id: expect.any(String),
        name: "MiniTech",
        description: "Tiny tech blog with big ideas.",
        websiteUrl: "https://minitech.site",
        isMembership: false,
        createdAt: expect.any(String)
    }
];
