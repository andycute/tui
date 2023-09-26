import { useEffect, useState } from 'react'
const Counter = () => {
    const [c, setc] = useState(0)
    useEffect(() => {

        let c1 = setInterval(() => {
            console.log(c)
            setc(c + 1)
        }, 1000)
        return () => {
            clearInterval(c1)
        }
    }, [])

    return <>{c}</>


}
export default Counter;