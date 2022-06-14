import * as React from "react";

// const welcome = {
//   greeting: 'Hey',
//   title: 'React'
// }

// function getTitle(title){
//   return title;
// }

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// const getAsyncStories = () =>
//   new Promise((resolve, reject) => {
//     // new Promise((resolve, reject) => setTimeout(reject, 2000));
//     setTimeout(() => resolve({ data: { stories: initialStories } }), 2000);
//   });

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  //  const title = 'React'

  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}react`) 
    .then((response) => response.json())
    .then((result)=> {
          dispatchStories({
            type: "STORIES_FETCH_SUCCESS",
            payload: result.hits,
          });
    }).catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));

  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <div>
      {/* <h1>{welcome.greeting} {welcome.title}</h1> */}
      {/* <h1>Hello {getTitle('React')}</h1> */}
      <InputWithLabel
        id="search"
        label="Search"
        type="text"
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      />
      <h1>My Hacker Stories</h1>
      <hr />
      {/* {/* {stories.isError && <p>Something went wrong ...</p>} */}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )} 
    </div>
  );
};

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
            // title={item.title}
            // url={item.url}
            // author={item.author}
            // num_comments={item.num_comments}
            // points={item.points}
          />
        );
      })}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

const InputWithLabel = ({
  id,
  label,
  type,
  value,
  onInputChange,
  isFocused,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{label} </label>

      <input
        id={id}
        type={type}
        name={id}
        onChange={onInputChange}
        autoFocus={isFocused}
        value={value}
      />
    </>
  );
};

export default App;
