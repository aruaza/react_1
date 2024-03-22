import Title from "./components/title/Title";
import About from "./components/about/About";

function App() {
  return (
    <div className="App">
        <Title title="title"  subtitle="subtitle"/>
        <About title="titleAbout" body="body" link="link"/>
    </div>
  );
}

export default App;
