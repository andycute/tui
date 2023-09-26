import { Dispatch, SetStateAction, useEffect, useState } from 'react'
type PostProps = { src: String, onClick: Dispatch<SetStateAction<boolean>> }
const Counter = (props: PostProps) => {
    const [imgsrc, setimgsrc] = useState("")
    useEffect(() => {
        const controller = new AbortController()
        fetch('https://www.baidu.com/link?url=s3_KkK0I1TmpfFjdozqPGU_uwJqmLF99L42AYAzH-w2ewk-2LAmvb9wFIKQrZx0n&wd=&eqid=e7dfde1500213d4a0000000564e2068f',
            { signal: controller.signal }
        ).then(e => e.text()).then(
            e => {
                setimgsrc('data:image/svg+xml;base64,' + btoa(e))
            }
        )
        return ()=>controller.abort()
    }, [props.src])

    return <>{imgsrc ? <img onClick={() => props.onClick((p) => !p)} src={imgsrc} /> : "no img"}</>


}
export default Counter;