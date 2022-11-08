import CreateForm from '@/components/create-form'
import ListActive from '@/components/list-active'
import ListReleased from '@/components/list-released'

function Home() {
  return (
    <>
      <CreateForm />
      <div className="mt-12">
        <ListActive />
        <div className="mt-10">
          <ListReleased />
        </div>
      </div>
    </>
  )
}

export default Home
