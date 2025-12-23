import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";



// add post 
export const addStandardPrintApi = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-post`,reqBody,reqHeader)
}

// home posts
export const homePostAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-posts`,{})
}

// user posts
export const userPostAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-posts`,{},reqHeader)
}

// all posts
export const allPostAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-posts`,{},reqHeader)
}

// all user
export const allUserAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-user`,{},reqHeader)
}




// Fetch single post by ID
export const singlePostAPI = async (postId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/post/${postId}`,{}, reqHeader);
  };

// home users
export const homeUserAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-users`,{})
}  

// Fetch single user by userID
export const singleUserAPI = async (userId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/user/${userId}`,{}, reqHeader);
  };

  // Fetch single post by userID
export const singleUserAllPostsAPI = async (userId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/user/posts/${userId}`,{}, reqHeader);
  };

// edit use
export const updateUserAPI = async (reqBody,reqHeader) => {
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader);
  };

// Edit post
export const updateUserPostAPI = async (id, reqHeader, reqBody) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/post/${id}/edit`, reqBody, reqHeader);
};

// deete post /post/:id/delete
export const deletePostAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/post/${id}/delete`, {}, reqHeader);
};


// admin 

// all posts approval
export const allPostApprovalAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/admin/all-post-approval`,{},reqHeader)
}

// Fetch single post by ID
export const adminSinglePostAPI = async (postId) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/admin-post-view/${postId}`,{});
  };

  // approve  post by ID
export const approvePostAPI  = async (id) => {
    return await commonAPI("PATCH", `${SERVER_BASE_URL}/approve-post/${id}`,{});
  };

  // deete post /post/:id/delete
export const adminDeletePostAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/admin/${id}/delete`, {});
};

// all posts 
export const allPostAdminAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/admin/all-post`,{})
}

// all posts 
export const allUserAdminAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/admin/all-user`,{})
}