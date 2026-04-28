type AboutProps = {
  content?: string | null
}

const About = ({ content }: AboutProps) => {
  if (!content) {
    return null
  }

  return (
    <section className="content-container pt-24">
      <div
        className="prose max-w-5xl text-center text-ui-fg-subtle mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

export default About
