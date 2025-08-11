import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { TaskList } from './TaskList'

export function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <Header />
        <TaskList />
      </main>
    </div>
  )
}