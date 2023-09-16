const setLocalStorageData = ({ userId, userName,userImage, role }) => {
    localStorage.setItem('userId', JSON.stringify(userId));
    localStorage.setItem('userName', JSON.stringify(userName));
    localStorage.setItem('userImage', JSON.stringify(userImage));
    localStorage.setItem('role', JSON.stringify(role));
  }
  
  const getLocalStorageData = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const userName = JSON.parse(localStorage.getItem('userName'));
    const userImage = JSON.parse(localStorage.getItem('userImage'));
    const role = JSON.parse(localStorage.getItem('role'));
    return { userId, userName, userImage,role};
  }
  
  const clearLocalStorageData = () => {
    localStorage.clear()
  }
  
  export { setLocalStorageData, getLocalStorageData, clearLocalStorageData };
  