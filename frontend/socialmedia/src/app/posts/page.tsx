'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

const UserCircle = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(); // Alkukirjaimet
  return (
    <div className="flex align-items-center justify-content-center border-round bg-primary text-white" style={{ width: '50px', height: '50px', fontSize: '20px', position: 'relative' }}>
      <span>{initials}</span>
      <i className="pi pi-thumbs-up" style={{ position: 'absolute', bottom: '-5px', right: '-5px', fontSize: '12px' }}></i>
    </div>
  );
};


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

  const token = localStorage.getItem('access');

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading updates...</p>;

  async function likePost(post: Post) {
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
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Updates</h1>
      {posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        posts.map((post: Post) => (
          <div key={post.id} className="border p-4 rounded mb-2">
            <p><strong>{post.created_by.first_name} {post.created_by.last_name}</strong></p>
            <p>Created: {post.created_at}</p>
            <p>{post.content}</p>
            <hr />
            <button onClick={()=>likePost(post)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Like
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
  );

  
}
