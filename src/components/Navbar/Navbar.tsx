import { FC } from "react"; // React functional component, using it to cast navbar to type react functional component

export const Navbar: FC = () => {
  return (
    <div
      data-testid={"navbar"} // test ID to identify the Navbar component in tests
      className={"flex flex-row justify-between items-center px-4 py-2"}
    >
      <div className={"w-[150px]"}>
        <img src={"/assets/images/gsynergy-logo.svg"} alt={"GSynergy Logo"} />
      </div>
      <div>
        <h1 className={"text-4xl font-semibold"}>Data Viewer App</h1>
      </div>
      <div>User</div>
      {/* Placeholder for the user information */}
    </div>
  );
};
