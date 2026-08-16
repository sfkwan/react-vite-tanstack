import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostSchema } from "./Post.schema";

const createPost = async (post: {
  userId: number;
  title: string;
  body: string;
}) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return PostSchema.parse(await response.json());
};

function AddPostComponent() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 4. Trigger the mutation with data
    mutate({
      userId: 10,
      title: "Tanstack Guide",
      body: "How to use Tanstack Query with React",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isPending && <p>Saving...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && data && (
        <div className="post-card">
          <p>title: {data.title}</p>
          <p>userId: {data.userId}</p>
          <p>body: {data.body}</p>
        </div>
      )}
      <button color="blue" type="submit" disabled={isPending}>
        Create Post
      </button>
    </form>
  );
}

export default AddPostComponent;
