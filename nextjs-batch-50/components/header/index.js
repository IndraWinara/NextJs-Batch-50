import { wihtAuth } from '../with-auth'
import Menu from '../menu'

function Header() {
  return (
    <div>
      <Menu />
    </div>
  )
}

export default wihtAuth(Header)