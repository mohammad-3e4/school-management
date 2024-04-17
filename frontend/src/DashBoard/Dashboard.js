import { useSelector } from "react-redux";

export default function Dashboard(){
    const { loading, error, message, user } = useSelector(
        (state) => state.user
      );
    return(
        <div>user role : { user.role }</div>

    )
} 