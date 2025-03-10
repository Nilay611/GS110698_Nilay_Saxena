import { FC } from "react"; // React functional component, using it to cast navbar to type react functional component
import { Button } from "../ui/Button/Button";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { logout } from "../../redux/auth/authSlice";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      data-testid={"navbar"} // test ID to identify the Navbar component in tests
      className={"flex flex-row justify-between items-center px-4 py-2"}
    >
      <div className={"w-[150px]"}>
        <img src={"/assets/images/gsynergy-logo.svg"} alt={"GSynergy Logo"} />
      </div>
      <div>
        <h1 className={"text-5xl"}>Data Viewer App</h1>
      </div>
      <div>
        <Button text={"Logout"} onClickHandle={() => dispatch(logout())} />
      </div>
    </div>
  );
};

export default Navbar;
