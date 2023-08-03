import BrandGithub from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github.tsx'
import LemonIcon from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lemon-2.tsx'

export const Nav = ({ active }: {
  active: string
}) => {
  const menus = [
    { name: '🏠', href: '/' },
    { name: 'Server', href: '/server' },
    { name: 'swr', href: '/swr' },
    { name: 'ignal', href: '/ignal' },
    { name: 'Signin', href: '/api/signin' },
    { name: 'Signout', href: '/api/signout' },
  ]

  return (
    <div class='bg-white w-full max-w-screen-lg py-6 px-8 flex flex-col md:flex-row gap-4'>
      <div class='flex items-center flex-1'>
        <LemonIcon />
        <div class='text-2xl  ml-1 font-bold'>
          Fresh
        </div>
      </div>
      <ul class='flex items-center gap-6'>
        {menus.map((menu) => (
          <li>
            <a
              href={menu.href}
              class={'text-gray-500 hover:text-gray-700 py-1 border-gray-500' +
                (menu.href === active ? ' font-bold border-b-2' : '')}
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// type Props = {
//   children: ComponentChildren;
// };

export function Footer({ isSignedIn, accessToken}:{isSignedIn: boolean, accessToken: string | null}) {
  const menus = [
    {
      title: 'OAuth Info',
      children: [
        { name: 'Provider: Github', href: '#' },
        { name: `Signed in ${ isSignedIn? '✅': '❌' }`, href: '#' },
        {
          name: `Access 💰 ${accessToken !== null ? '✅' : '❌'}`, href: '#' },
      ],
    },
  ]

  return (
    <div class='bg-white flex flex-col md:flex-row w-full max-w-screen-lg gap-8 md:gap-16 px-8 py-8 text-sm'>
      <div class='flex-1'>
        <div class='flex items-center gap-1'>
          <LemonIcon class='inline-block' />
          <div class='font-bold text-2xl'>
            Fresh tRPC OAuth
          </div>
        </div>
        <div class='text-gray-500'>
          Full Stack Demo
        </div>
      </div>

      {menus.map((item) => (
        <div class='mb-4' key={item.title}>
          <div class='font-bold'>{item.title}</div>
          <ul class='mt-2'>
            {item.children.map((child) => (
              <li class='mt-2' key={child.name}>
                <a
                  class='text-gray-500 hover:text-gray-700'
                  href={child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div class='text-gray-500 space-y-2'>
        <a
          href='https://github.com/willpuckett/fresh-trpc'
          class='inline-block hover:text-black'
          aria-label='GitHub'
        >
          <BrandGithub />
        </a>
      </div>
    </div>
  )
}
