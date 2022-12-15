import { Post } from "./user-models";

export interface PostDataType {
  title: string;
  content: string;
  url: string;
  label: string;
}

export interface PostCtxType {
  displayPosts: Post[];
  setDisplayPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  specPost: Post;
  setSpecPost: React.Dispatch<React.SetStateAction<Post>>;
  fetchSpecPost: (id: string, prevent: boolean) => void;
  onUpVote: (
    id: string,
    setObjToRender?: React.Dispatch<React.SetStateAction<Post>>
  ) => void;
  onDelPost: (username: string, id: string) => void;
  fetchPostApi: () => void;
  onCreateNewPost: (postData: PostDataType) => void;
  onEditPost: (id: string, oldData: Post) => void;
  postIdToEdit: string;
  setPostIdToEdit: React.Dispatch<React.SetStateAction<string>>;
  onMoreLikeThis: (label: string) => void;
  isFiltering: boolean;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  labelToDisplay: string;
  setLabelToDisplay: React.Dispatch<React.SetStateAction<string>>;
}

// TEPLATES

export const postDataTemplate = {
  title: "",
  content: "",
  url: "",
  label: "none",
};
