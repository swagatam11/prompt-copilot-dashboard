// dashboard-ui/src/App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [avatars, setAvatars] = useState([])
  const [selected, setSelected] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/avatars')
      .then(res => setAvatars(res.data))
  }, [])

  const handleWrap = () => {
    if (!selected || !input) return
    axios.post('http://localhost:8000/wrap_prompt', {
      avatar_id: selected,
      user_input: input
    }).then(res => setOutput(res.data.wrapped_prompt))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Prompt Engineering Dashboard</h2>

      <label>Select Avatar:</label><br />
      <select onChange={e => setSelected(e.target.value)} value={selected}>
        <option value="">-- Choose --</option>
        {avatars.map(a => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

      <h3>Enter Your Prompt</h3>
      <textarea
        rows="4"
        style={{ width: '100%' }}
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <br />
      <button onClick={handleWrap} style={{ marginTop: 10 }}>
        Wrap Prompt
      </button>

      {output && (
        <>
          <h3>Wrapped Prompt</h3>
          <pre style={{ background: '#222', color: '#fff', padding: 10, border: '1px solid #fff',  borderRadius: 4 }}>{output}</pre>

        </>
      )}
    </div>
  )
}

export default App
