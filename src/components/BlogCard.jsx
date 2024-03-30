import React from 'react';
import { FaFolder, FaTags } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
    const body = blog?.body || ''; // Default value to prevent errors
    const slicedBody = body.length > 150 ? body.slice(0, 150) + "..." : body;
    return (
        <div className="blog-card">
            <img src={blog.images} alt={blog.title} className="blog-card-image" />
            <div className="blog-card-content">
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-description" dangerouslySetInnerHTML={{ __html: slicedBody }}></p>
                <div className="blog-card-meta">
                    <p className="blog-card-category"><FaFolder/> {blog.category}</p>
                    <p className="blog-card-tag"><FaTags /> {blog.tags}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
