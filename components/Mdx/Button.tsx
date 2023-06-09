const Button = ({ link, text }: { link: string; text: string }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener" aria-label={text} tabIndex={-1}>
      <button className="buttonStyle">{text}</button>
    </a>
  </div>
)

export default Button
