import logo from './logo.svg';
import './App.css';


function checkIsOnline () {
  const [isDC,setIsDc] = useState(false)
  const check = isDC ? 
  const data = fetch("https://google.com",{
    mode:"no-cors"
  }).then(setIsDc(false)).catch(() => {
    console.log("is offline there is an error")
    setIsDc(true)
  })

}


function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
