import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  const linkMap: Record<string, string> = {
    '/welcome/1': '/welcome/2',
    '/welcome/2': '/welcome/3',
    '/welcome/3': '/welcome/4',
    '/welcome/4': '/welcome/xxx',
  }
  const isAnimate = useRef(false)

  const [extraStyle, setExtraStyle] = useState<Record<string, 'relative' | 'absolute'>>({ position: 'relative' })


  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)', },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 200 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
    },
  })

  // 绑定元素
  const elementRef = useRef<HTMLElement>(null)
  // 监听滚动
  const direction = useSwipe(elementRef, {
    onTouchstart(e) {
      e.preventDefault()
    },
  })

  const nav = useNavigate()
  useEffect(() => {
    if(direction == 'left' && !isAnimate.current){
      isAnimate.current = true
      setTimeout(() => {
        isAnimate.current = false
      }, 150)

      nav(linkMap[location.pathname])
    }
  }, [direction])

  const jumpClick = () => {
    localStorage.setItem("hasReadWelcomes", 'yes')
  }

  return (
    <div>
      <div className="bg-#5f34bf" w-screen h-screen flex flex-col items-stretch>
        <header shrink-0 text-center pt-64px>
          <img src={logo} alt="logo" w-64px h-69px />
          <h1 text="#D4D4EE" text-32px>山竹记账</h1>
        </header>
        <main grow-1 shrink-1 relative ref={elementRef}>
          {transitions((style, pathname) =>
            // <animated.div  style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px justify-center items-center key={pathname}  >
            <animated.div style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px justify-center items-center key={pathname} >
              <div bg-white w="100%" h="100%" flex justify-center items-center rounded-8px>
                {map.current[pathname]}
              </div>
            </animated.div>
          )}
        </main>
        <footer shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1 pb-20px>
          <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
          <Link style={{ gridArea: '1 / 3 / 2 / 4' }} to="/home" onClick={() => jumpClick()}>跳过</Link>
        </footer>
      </div>
    </div >
  )
}

