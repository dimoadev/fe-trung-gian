export const useAuth = () => {
   const user = JSON.parse(localStorage.getItem("axu"));
    return {
        user
    }
}