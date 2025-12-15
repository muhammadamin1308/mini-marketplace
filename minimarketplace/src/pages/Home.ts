// import Navigation from "../components/Navigation"

const Home = () => {
    const fragment = document.createDocumentFragment();

    const h1 = document.createElement("h1");
    h1.textContent = "Home";

    fragment.appendChild(h1);

    return fragment;
};

export default Home;