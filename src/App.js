import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getText } from './redux/features/textSlice'

function App() {
  const dispatch = useDispatch()
  const [number, setNumber] = useState(4)
  const [html, setHtml] = useState('text')
  const status = useSelector((state) => state.text.status)

  const text = useSelector((state) => state.text.text)

  const type = useMemo(() => {
    return { n: number, h: html }
  }, [number, html])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getText(type))
    }
  }, [dispatch, type])

  return (
    <div className='App'>
      <h1>React sample text generator app</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='parag'>Paragraph</label>
          <input
            type='number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id='parag'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='choice'>Include HTML</label>
          <select
            name='choice'
            onChange={(e) => setHtml(e.target.value)}
            id='choice'
          >
            <option value='text'>No</option>
            <option value='html'>Yes</option>
          </select>
        </div>
      </form>
      {text && (
        <div>
          {text.map((p, index) => {
            if (html === 'text') {
              return <p key={index}>{p}</p>
            } else {
              return <p key={index}>{`<p>${p}</p>`}</p>
            }
          })}
        </div>
      )}
    </div>
  )
}

export default App
