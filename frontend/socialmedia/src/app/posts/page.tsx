'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RefreshToken from '../services/auth';
import NewPost, { PostDelete, PostLike } from '../services/post';
import { useRouter } from 'next/navigation';
import Logged from '../components/logged';

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

  /*async function likePost(post: Post) {
    console.log(post.id);
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${post.id}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to like post', errorData);
      } else {
        console.log('Post liked successfully');
      }
    } catch (error) {
      console.error('Error while liking post', error);
    }
  }*/

  return (
    <div>
      <Logged></Logged>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Updates</h1>
        <div className="border p-4 rounded mb-2">
          <p><strong>New update</strong></p>
          <textarea onChange={(e) => setNewPost(e.target.value)}></textarea>
          <button onClick={()=>handleNewPost(newPost)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Send
          </button>
        </div>
        {posts.length === 0 ? (
          <p>No posts</p>
        ) : (
          posts.map((post: Post) => (
            <div key={post.id} className="border p-4 rounded mb-2">
              <p><strong>{post.created_by.first_name} {post.created_by.last_name}</strong></p>
              <p>Created: {post.created_at}</p>
              <p>{post.content}</p>
              <hr />
              <button onClick={()=>handlePostLike(post)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Like
              </button>
              <button onClick={()=>handlePostDelete(post)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
              </button>
              {post.likes.length === 0 ? (
                <p>No likes yet</p>
              ) : (
                <ul>
                  {post.likes.map((user: User, index: number) => (
                    <li key={user.id}>👍 {user.first_name} {user.last_name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  
}
