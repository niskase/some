export default async function NewPost(newPost: string, onSuccess: () => void) {

    const token = localStorage.getItem('access');

    try {
        const response = await fetch(`http://localhost:8000/api/posts/`, {
          method: 'POST',
          body: JSON.stringify({
            content: newPost
          }),
          headers: {
            'content-type': 'application/json',
            'Authorization': `${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to like post', errorData);
        } else {
          console.log('Post liked successfully');
          onSuccess();
        }
      } catch (error) {
        console.error('Error while liking post', error);
      }
}

export async function PostLike(postId: number, onSuccess: () => void) {

    const token = localStorage.getItem('access');

    try {
        const response = await fetch(`http://localhost:8000/api/posts/${postId}/like/`, {
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
        onSuccess();
        }
    } catch (error) {
        console.error('Error while liking post', error);
    }

}

export async function PostDelete(postId: number, onSuccess: () => void) {

  const token = localStorage.getItem('access');

  try {
    const response = await fetch(`http://localhost:8000/api/posts/${postId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to delete post', errorData);
    } else {
      console.log('Post liked successfully');
      onSuccess();
    }
    

  } catch(error) {
    console.error("Error while deleting post", error);
  }

}