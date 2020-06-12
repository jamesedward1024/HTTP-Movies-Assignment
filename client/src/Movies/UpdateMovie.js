import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Grid, Container, Button } from '@material-ui/core'
import { useParams, useHistory } from "react-router-dom"


const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: 0,
  stars: []
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialState)
  const params = useParams();
  const {push} = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data)
        props.getMovieList()
        setMovie(initialState)
        push(`/movies/${params.id}`)
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);



  return (
    <div>
      <Grid  aligncontent="space-around">
      <form onSubmit={handleSubmit}>
        <Container direction="column">
        <Input type="text" name="title" value={movie.title} onChange={handleChange} />
        </Container>
        <Container direction="column">
        <Input type="text" name="director" value={movie.director} onChange={handleChange} />
        </Container>
        <Container direction="column">
        <Input type="number" name="metascore" value={movie.metascore} onChange={handleChange} />
        </Container>
        <Container direction="column">
        <Input type="text" name="stars" value={movie.stars} onChange={handleChange} />
        </Container>
        <Container direction="column">
        <Button type="submit">Submit</Button>
        </Container>
      </form>
      </Grid>
    </div>

  )
}

export default UpdateMovie;