import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import themeFile from '../util/theme';
// material-ui stuff
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';
const styles = themeFile
// const styles = {
//     form: {
//         textAlign: 'center'
//     },
//     image: {
//         margin: '20px auto 20px auto',
//     },
//     pageTitle: {
//         margin: '10px auto 10px auto'
//     },
//     textField: {
//         margin: '10px auto 10px auto'
//     },
//     button: {
//         marginTop: 20,
//         position: 'relative'
//     },
//     customError: {
//         color: 'red',
//         fontSize: '0.8rem',
//         marginTop: 10,
//     },
//     progress: {
//         position: 'absolute'
//     }
// }

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props);
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form} >
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>

                    {/* form */}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField id="password" name="password" type="password" label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {/* wrong credential error */}
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit' variant="contained" color="primary"
                            className={classes.button} disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )}
                        </Button> <br />
                        <small> dont have an account ? sign up <Link to='/signup'>here</Link></small>
                    </form>
                    {/* end of form */}
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
}

function WithNavigation(props) {
    const navigate = useNavigate();
    return <Login navigate={navigate} {...props} />
}
// export default withStyles(styles)(Login);
const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(WithNavigation));
