'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RefreshToken from '../services/auth';
import NewPost, { PostDelete, PostLike } from '../services/post';
import { useRouter } from 'next/navigation';
import Logout from '../components/logout';

class Post {
  id!: number;
  content!: string;
  created_at!: string;
  created_by!: User;
  likes!: User[];
}

class User {
  first_name!: string;
  last_name!: string;
  user_id!: number;
  username!: string;
}


export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  const token = localStorage.getItem('access');

  const router = useRouter();

  

  const fetchPosts = async () => {
    try {
      const response = await api.get('http://localhost:8000/api/posts/', {
        headers: {
          Authorization: token,
        },
      });

      setPosts(response.data)

    } catch (error) {
      console.error('Virhe haettaessa postauksia:', error.response.data);
      if (error.response.data.code == "token_not_valid") {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = async (newPost: string) => {
    await NewPost(newPost, fetchPosts);
    setNewPost('');
  };

  const handlePostLike = async (post: Post) => {
    await PostLike(post.id, fetchPosts);
  }

  const handlePostDelete = async (post: Post) => {
    await PostDelete(post.id, fetchPosts);
  }

  if (loading) return <p>Loading updates...</p>;

  return (
    <div className="grid grid-cols-2">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Community</h1>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="comment" className="sr-only">Your comment</label>
                <textarea onChange={(e) => setNewPost(e.target.value)} id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Publish a post..." required ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                <button onClick={()=>handleNewPost(newPost)} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish
                </button>
            </div>
        </div>
        {posts.length === 0 ? (
          <p>No posts</p>
        ) : (
          posts.map((post: Post) => (
            <div key="post">
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                  <em>By {post.created_by.first_name} {post.created_by.last_name} ~ {post.created_at}</em>
                </div>
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="comment" className="sr-only">Your comment</label>
                    <p>{post.content}</p>
                </div>
                <div className="flex px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                  <button type="button" onClick={()=>handlePostLike(post)} className="inline-flex justify-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <span className="sr-only">Like</span>
                  </button>
                  <button type="button" onClick={()=>handlePostDelete(post)} className="inline-flex justify-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
                {post.likes.length === 0 ? (
                  <div className="flex px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                    <p>No likes yet</p>
                  </div>
                  ) : (
                    <div className="flex px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                      <p>Likes:</p>
                      <ul>
                        {post.likes.map((user: User, index: number) => (
                          <li key={user.id}>👍 {user.first_name} {user.last_name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
            </div>
          </div>
          ))
        )}
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Personal</h1>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Logout></Logout>
          <p className="mt-4 font-bold">Friends</p>
          <p className="mt-4 font-bold">Requests</p>
        </div>
      </div>
    </div>
  );

  
}
