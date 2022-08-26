import { IHeaderProps } from "../interfaces/IHeaderProps";

export default function Header(props: IHeaderProps) {
  const { searchValue, setSearchValue } = props;
  return (
    <header className="header">
      <h1>Todo-list app</h1>
      <input className="header__input" 
            type="search" 
            value={searchValue} 
            placeholder="Search todos" 
            onChange={(e) => setSearchValue(e.target.value)} />
    </header>
  )
}