import { useEffect, useMemo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getText } from './redux/features/textSlice'

function App() {
  const dispatch = useDispatch()
  const [number, setNumber] = useState(4)
  const [html, setHtml] = useState('text')
  const textAreaRef = useRef(null)

  const status = useSelector((state) => state.text.status)
  const text = useSelector((state) => state.text.text)

  const type = useMemo(() => {
    return { n: number, h: html }
  }, [number, html])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getText(type))
    }
    // eslint-disable-next-line
  }, [dispatch, type])

  return (
    <div className='container'>
      <h1>React sample text generator app</h1>
      <div className='generator'>
        <div className='generator-head'>
          <form>
            <div className='form-group'>
              <label htmlFor='parag'>Paragraph</label>
              <input
                className='form-control'
                type='number'
                min='1'
                max='10'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                id='parag'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='choice'>Include HTML</label>
              <select
                className='form-control'
                name='choice'
                onChange={(e) => setHtml(e.target.value)}
                id='choice'
              >
                <option value='text'>No</option>
                <option value='html'>Yes</option>
              </select>
            </div>
          </form>
          <button
            type='button'
            className='btn'
            onClick={() =>
              navigator.clipboard.writeText(textAreaRef.current.innerText)
            }
          >
            <span>COPY</span>
          </button>
        </div>
        <div className='generator-body' ref={textAreaRef}>
          {text && (
            <div className='gen-content'>
              {text.map((p, index) => {
                if (html === 'text') {
                  return (
                    <p key={index}>
                      {p}
                      <br />
                      <br />
                    </p>
                  )
                } else {
                  return (
                    <p key={index}>
                      {`<p>${p}</p>`} <br />
                      <br />
                    </p>
                  )
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
