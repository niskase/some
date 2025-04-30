export default async function NewFriend(newFriend: string, onSuccess: () => void) {

    const token = localStorage.getItem('access');

    try {
        const response = await fetch(`http://localhost:8000/api/friend-request/`, {
          method: 'POST',
          body: JSON.stringify({
            receiver_name: newFriend
          }),
          headers: {
            'content-type': 'application/json',
            'Authorization': `${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.detail) {
            alert(errorData.detail);
            } else if (errorData.msg) {
                alert(errorData.msg);
            }
        } else {
          alert('Friend request sent successfully');
          onSuccess();
        }
      } catch (error: any) {
        if (error.detail) {
            alert(error.detail);
        }
      }
}
