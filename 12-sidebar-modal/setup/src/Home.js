import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Home = () => {
    let { state, setState } = useGlobalContext();
    return (
        <main>
            <button
                className="sidebar-toggle"
                onClick={() => setState({ ...state, isSidebarVisible: true })}
            >
                <FaBars />
            </button>
            <button
                className="btn"
                onClick={() => setState({ ...state, isModalVisible: true })}
            >
                Show Modal
            </button>
        </main>
    );
};

export default Home;
