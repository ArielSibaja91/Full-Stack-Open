const AddBlog = ({
  handleSubmit,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="url"
            onChange={handleUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddBlog;
