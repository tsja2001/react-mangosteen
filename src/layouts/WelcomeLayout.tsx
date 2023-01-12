import { animated, useTransition } from '@react-spring/web'
import { ReactNode, useState } from 'react'
import { useRef } from 'react'
import logo from '../assets/images/logo.svg'
import { Link, useLocation, useOutlet } from 'react-router-dom'

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
	const [extraStyle, setExtraStyle] = useState<Record<string, 'relative' | 'absolute'>>({ position: 'relative' })

	map.current[location.pathname] = outlet
	const transitions = useTransition(location.pathname, {
		from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
		enter: { transform: 'translateX(0%)', },
		leave: { transform: 'translateX(-100%)' },
		config: { duration: 300 },
		onStart: () => {
			setExtraStyle({ position: 'absolute' })
		},
		onRest: () => {
			setExtraStyle({ position: 'relative' })
		},
	})
	return (
		<div>
			<div className="bg-#5f34bf" w-screen h-screen flex flex-col items-stretch>
				<header shrink-0 text-center pt-64px>
					<img src={logo} alt="logo" w-64px h-69px />
					<h1 text="#D4D4EE" text-32px>山竹记账</h1>
				</header>
				<main grow-1 shrink-1 relative >
					{transitions((style, pathname) =>
						// <animated.div  style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px justify-center items-center key={pathname}  >
						<animated.div style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px justify-center items-center key={pathname}  >
							<div bg-white w="100%" h="100%" flex justify-center items-center rounded-8px>
								{map.current[pathname]}
							</div>
						</animated.div>
					)}
				</main>
				<footer shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1 pb-20px>
					<Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
					<Link style={{ gridArea: '1 / 3 / 2 / 4' }} to="/welcome/xxx">跳过</Link>
				</footer>
			</div>
		</div >
	)
}

