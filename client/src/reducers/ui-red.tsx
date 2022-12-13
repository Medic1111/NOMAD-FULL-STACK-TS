export type UiActionType =
  | { type: "CLOSE" }
  | { type: "LOADING" }
  | { type: "CREATEPOST" }
  | { type: "EDITPOST" }
  | { type: "EDITAVATAR" };

export type UiStateType = {
  showModal: boolean;
  loading: boolean;
  createPost: boolean;
  editPost: boolean;
  editAvatar: boolean;
};

export const UiState = {
  showModal: false,
  loading: false,
  createPost: false,
  editPost: false,
  editAvatar: false,
};

const uiRed = (state: UiStateType, action: UiActionType) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...UiState,
        showModal: true,
        loading: true,
      };
    }
    case "CREATEPOST": {
      return {
        ...UiState,
        showModal: true,
        createPost: true,
      };
    }
    case "EDITPOST": {
      return {
        ...UiState,
        showModal: true,
        editPost: true,
      };
    }
    case "EDITAVATAR": {
      return {
        ...UiState,
        showModal: true,
        editAvatar: true,
      };
    }
    case "CLOSE": {
      return { ...UiState };
    }
    default:
      return { ...UiState };
  }
};

export default uiRed;
