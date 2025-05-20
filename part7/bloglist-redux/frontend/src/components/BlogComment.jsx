import { useSelector } from "react-redux";
import AddComment from "./AddComment";

const BlogComment = ({ id }) => {
  const comments = useSelector((state) => state.comments);

  return (
    <div>
      <h3>comments</h3>
      <AddComment id={id} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComment;
