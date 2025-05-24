import { useSelector } from "react-redux";
import Blog from "./Blog";
import { Table, TableContainer, TableBody, Paper } from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs.slice().sort((a, b) => b.likes - a.likes);
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
