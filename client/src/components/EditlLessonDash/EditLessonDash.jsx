import style from './EditLessonDash.module.css';
import arrowIcon from '../../assets/icons/arrow-yellow.png';
import React, {Component} from 'react';
import checkIcon from '../../assets/icons/check.png'
import crossIcon from '../../assets/icons/cross.png'
import { connect } from 'react-redux';
import { fetchLessonsByID } from '../../redux/features/lessonsSlice';
import { fetchAllLessonTypes } from '../../redux/features/typesSlice';
import { fetchAllLessonGoals } from '../../redux/features/goalsSlice';
import { fetchAllMonitors } from '../../redux/features/usersSlice';
import { fetchAllOffices } from '../../redux/features/officesSlice';
import validations from './validations/mainValidation/index';
import arrayValidations from './validations/arrayValidations/index';
import { weekDays } from '../../utils/constants';
import axios from 'axios';
import { URL } from '../../utils/constants';
import loadingGif from '../../assets/gifs/loading.gif'


class DetailLessonDash extends Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.id = props.id;
        this.availabilityOption = null;
        this.state = {
            lessonAttributes: {
                name: '',
                description: '',
                shortDescription: '',
                effort: '',
                image: '',
                scheduleHourStart: '',
                scheduleHourFinish: '',
                scheduleDays: [],
                types: [],
                goals: [],
                isAvailable:null,
                monitor: '',
                branchoffice:'',
                monitors: '',
             },
            errors: {
                name: '',
                description: '',
                shortDescription: '',
                effort: '',
                image: '',
                scheduleHourStart: '',
                scheduleHourFinish: '',
                scheduleDays: '',
                types: '',
                goals: '',
                monitor: '',
                branchoffice: '',
            },
            horaInicio: '',
            allowSubmit: true,
            message:'',
            serverResponse: '',
            serverErrorResponse: '',
            imagePreviewUrl: '',
        };
    };

    generateInitialHourOptions = (type) => {
        const hours = [];

        for (let i = 1; i <= 24 ; i ++){
          for (let j = 0; j <= 30 ; j+=30){
            if ( j === 0){
             
               hours.push(
                <option key={`${i}:00`} value={`${i}`} name='scheduleHourStart' selected={this.state.lessonAttributes[type] === `${i}:${j}0`}
                >{`${i}:${j}0`}</option>)
            } else {
                
                hours.push(
                    <option key={`${i}:${j}`} value={`${i}`} name='scheduleHourStart' selected={this.state.lessonAttributes[type] === `${i}:${j}`} 
                    >{`${i}:${j}`}</option>
                )
            }
            
          }
        }
        return hours;
    };
    
    generateFinalHourOptions = (type) => {
         
        const hours = [];
        for (let i = 1; i <= 24 ; i ++){
          for (let j = 0; j <= 30 ; j+=30){
            if ( this.state.horaInicio <= i){
              if(j === 0) {
                hours.push(
                    <option key={`${i}:00`} value={`${i}:00`} name='scheduleHourStart' selected={this.state.lessonAttributes[type] === `${i}:${j}0`}
                    >{`${i}:${j}0`}</option>
                    )
              } else {
                hours.push(
                    <option key={`${i}:${j}`} value={`${i}:${j}`} name='scheduleHourFinish' selected={this.state.lessonAttributes[type] === `${i}:${j}`}
                    >{`${i}:${j}`}</option>
                    )
              }
            }
            
          }
        }
        return hours.slice(1);
    };

        generateAvailableOptions = () => {
            return (
                <>
                    <option value={this.availabilityMiddleware(this.availabilityOption)} selected={true}>{this.availabilityMiddleware(this.availabilityOption)}</option>
                    <option value={this.availabilityMiddleware(!this.availabilityOption)}> {(this.availabilityOption) ? 'Inactiva' : 'Activa'} </option>
                </>
            );
        };

        generateTrainersOptions = () => {

            return this.props.monitors.map((monitor) => {
                return (
                    <option key={monitor.id} value={monitor.fullName} selected ={(monitor.fullName === this.state.lessonAttributes.monitors)}>{monitor.fullName}</option>
                )
            })
        };
    
        generateBranchOfficeOptions = () => {
            return this.props.offices.map((office) => {
                 
                return (
                    <option key={office.id} value={office.name} selected={(office.name === this.state.lessonAttributes.branchoffice)}>{office.name}</option>
                )
            })
        };

        availabilityMiddleware = (value) => {
            if (value === 'Activa') return true;
            if (value === 'Inactiva') return false;
            if (value === true) return 'Activa';
            if (value === false) return 'Inactiva';
        };

        handleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: value,
                },
                errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
            }, () => {
                    this.setState({
                        allowSubmit: Object.values(this.state.errors).every((item) => item === '') 
                    });   
            });
            
        };
        handleTrainerOptions = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: value,
                },
            }, () =>{
                this.setState({
                    errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
                })
            }, () => {
                this.setState({
                    allowSubmit: Object.values(this.state.lessonAttributes).every((item) => Boolean(item)  === true) && Object.values(this.state.errors).every((item) => item === '')
                    });
    
        });
    
    };
    
        handleBranchOfficeOptions = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: [value],
                },
            }, () =>{
                this.setState({
                    errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
                })
            }
            , () => {
                this.setState({
                    allowSubmit: Object.values(this.state.lessonAttributes).every((item) => Boolean(item)  === true) && Object.values(this.state.errors).every((item) => item === '')
                    });
            }
            );
        };


        handleHoursBox = (event) => {
            const name = event.target.name;
            const value = event.target.value;
    
            if (name === 'scheduleHourStart') {
                this.setState({
                    horaInicio: value.split(':')[0],
                    lessonAttributes: {
                        ...this.state.lessonAttributes,
                        [name]: value,
                    },
                }, () =>{
                    this.setState({
                        errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
                    },() =>{
                        this.setState({
                            allowSubmit: Object.values(this.state.errors).every((item) => item === '')
                        });
                    });
                });
                
            } else {
                this.setState({
                    lessonAttributes: {
                        ...this.state.lessonAttributes,
                        [name]: value,
                    },
                    errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
                }, () =>{
                    this.setState({
    
                    }, () => {
                        this.setState({
                            allowSubmit: Object.values(this.state.errors).every((item) => item === '')
                            });
    
                    })
                });
            }
        };

        handleCheckBox = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            const isChecked = event.target.checked;
            if (isChecked) {
                this.setState({
                    lessonAttributes: {
                        ...this.state.lessonAttributes,
                        [name]: [...this.state.lessonAttributes[name], value],
                    },
                }, () => {
                    this.setState({
                        errors: arrayValidations(this.state.lessonAttributes,this.state.errors, name)
                    }, () => {
                        this.setState({
                            allowSubmit: Object.values(this.state.errors).every((item) => item === '')});
                    });
                    
                });
            } else {
                this.setState({
                    lessonAttributes: {
                        ...this.state.lessonAttributes,
                        [name]: this.state.lessonAttributes[name].filter((item) => item !== value),
                    },
                }, () => {
                    this.setState({
                        errors: arrayValidations(this.state.lessonAttributes, this.state.errors, name)
                    }, () => {
                        this.setState({
                            allowSubmit: Object.values(this.state.errors).every((item) => item === '')});
                        });

                });
            }
        };

        handleImageChange = (event) => {
            const name = event.target.name;
            const value = event.target.files[0];
          
            const reader = new FileReader();
            
            reader.onloadend = () => {
              this.setState(
                {
                  lessonAttributes: {
                    ...this.state.lessonAttributes,
                    image: value,
                  },
                  imagePreviewUrl: reader.result, 
                },
                () => {
                  this.setState(
                    {
                      errors: validations(value, name, this.state.errors, this.state.lessonAttributes),
                      allowSubmit: Object.values(this.state.lessonAttributes).every((item) => Boolean(item) === true) && Object.values(this.state.errors).every((item) => item === ''),
                    }
                  );
                }
              );
            };
            
            reader.readAsDataURL(value);
          };
        
        handleConfirmarClick = (event) => {
            event.preventDefault();
            if (this.state.message.includes('modificar')){
                const formData = new FormData();
        
                formData.append('image', this.state.lessonAttributes.image);
                formData.append('lessonAttributes', JSON.stringify(this.state.lessonAttributes));
                
                axios.put(`${URL}/lessons/update/${this.props.id}`, formData)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        serverResponse: 'Clase modificada con éxito',
                        message: '',
                     });
                }).catch((err) => {
                    this.setState({
                        serverErrorResponse: err.message,
                        message: '',
                    });
                });

            } else {
                event.preventDefault();
                axios.delete(`${URL}/lessons/delete/${this.props.id}`)
                .then((res) => {
                    this.setState({
                        serverResponse: res.data,
                        message: ''});
                }).catch((err) => {
                    this.setState({
                        serverResponse: err.response.data,
                        message: ''});
                }
                );
            }
        };

        handleIsAvailable = (event) => {
            const name = event.target.name;
            const value = event.target.value;

            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: this.availabilityMiddleware(value),
                },
            });

            this.setState({
                errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
            })

        };
        
        handleVolverClick = (event) => {
            event.preventDefault();
            this.setState({
                message: '',
                serverResponse: '',
            });
        };

        handleConfirmModify = (event) => {          
            event.preventDefault();
            this.setState({
                message: '¿Estás seguro de que quieres modificar la clase?',
            });
        };
        handleConfirmRemove = (event) => {
            event.preventDefault();
            this.setState({
                message: '¿Estás seguro de que quieres eliminar la clase?',
            });
        };

        
     componentDidMount(prevProps, prevState) {
        const {fetchLessonsByID, fetchAllLessonTypes, fetchAllLessonGoals, fetchAllMonitors, fetchAllOffices} = this.props;
         fetchLessonsByID(this.props.id)
         .then((res) =>{ 
             this.setState({
                 lessonAttributes: {
                        name: res.payload.name,
                        description: res.payload.description,
                        shortDescription: res.payload.shortDescription,
                        effort: res.payload.effort,
                        image: res.payload.image,
                        scheduleHourStart: res.payload.scheduleHourStart,
                        scheduleHourFinish: res.payload.scheduleHourFinish,
                        scheduleDays: res.payload.scheduleDays,
                        types: res.payload.types,
                        goals: res.payload.goals,
                        isAvailable: res.payload.isAvailable,
                        monitors: res.payload.monitors,
                        branchoffice: res.payload.office,

                 }
             },
             () => {
                this.availabilityOption = this.state.lessonAttributes.isAvailable;
             });
         }) 
         fetchAllLessonTypes();
         fetchAllLessonGoals();
         fetchAllMonitors();
         fetchAllOffices();
         this.inputRef = React.createRef();
         
    };

    render() {
        const {lessonsTypes, lessonsGoals, status} = this.props;
        const {lessonAttributes, errors} = this.state;

      return (
        <form className={style.MainContainer}>
            <div className={style.Navigation}>
                <a href='http://localhost:3000/dashboard/clases'>
                    <img className={style.ArrowIcon} src={arrowIcon} alt="" />
                </a>
                <h2>{lessonAttributes.name}</h2>
            </div>
            <h1>EDITA UNA CLASE</h1>
            {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
            <div className={style.Teacher}>{`Profesor: ${lessonAttributes.monitors}`}</div>
            <div className={style.EditContainer}>
                <div className={style.DetailContainer}>
                    <div className={style.leftContainer}>
                        <div className={style.Description}>
                            <label htmlFor='name'>Nombre*</label>
                            <input placeholder='Nombre' value={lessonAttributes.name} type='text' id='name' name='name' onChange={this.handleChange}/>
                        </div>
                        {errors.name && <p className={style.Error}>{errors.name}</p>}
                        <div className={style.Description}>
                            <label>Descripción*</label>
                            <input placeholder='Descripción' value={lessonAttributes.description} id='description' type='text' name='description' onChange={this.handleChange}/>
                        </div>
                        {errors.description && <p className={style.Error}>{errors.description}</p>}

                        <div className={style.Description}>
                            <label>Breve descripción*</label>
                            <input placeholder='Breve Descripción' value={lessonAttributes.shortDescription} id='shortDescription' type='text' name='shortDescription' onChange={this.handleChange}/>
                        </div>
                        {errors.shortDescription && <p className={style.Error}>{errors.shortDescription}</p>}

                        <div className={style.Description}>
                            <label>Intensidad*</label>
                            <input placeholder='Intensidad' value={lessonAttributes.effort} type='text' id='effort' name='effort' onChange={this.handleChange}/>
                        </div>
                        {errors.effort && <p className={style.Error}>{errors.effort}</p>}

                        <div className={style.SelectorContainer}>
                            <div>
                                <label className={style.Profesor}>Profesor*</label>
                                <select onChange={this.handleTrainerOptions} name='monitor'>
                                    <option value='Seleccione'>Seleccione</option>
                                    {this.generateTrainersOptions().map((option) => option)}
                                </select>    
                            </div>
                            {errors.monitor && <p className={style.Error}>{errors.monitor}</p>}
                            <div>
                                <label className={style.Profesor}>Sede*</label>
                                <select onChange={this.handleBranchOfficeOptions} name='branchoffice'>
                                    <option value='Seleccione'>Seleccione</option>
                                    {this.generateBranchOfficeOptions().map((option) => option)}
                                </select>
                            </div>
                            {errors.branchoffice && <p className={style.Error}>{errors.branchoffice}</p>}
                        </div>


                        <div className={style.FileInput}>
                            <label>Imagen*</label>
                            <input id='image' type='file' name='image' onChange={ this.handleImageChange } />
                        </div>
                        
                        {errors.image && <p className={style.Error}>{errors.image}</p>}
                        
                        <div className={style.leftContainer}>
                            {this.state.imagePreviewUrl &&(<div className={style.ImageContainer}>
                                {lessonAttributes.image && <img src={this.state.imagePreviewUrl} alt="Tu imagen" />}
                            </div>)}
                            {lessonAttributes.image && (<div className={style.ImageContainer}>
                                {lessonAttributes.image && <img src={lessonAttributes.image} alt="Tu imagen" />}
                            </div>)}
                        </div>

                    </div>

                    <div className={style.RightContainer}>
                        <div className={`${style.RightSubContainer} ${style.HourContainer}`}>
                            <div>
                                <h2>Hora inicio</h2>
                                <select name='scheduleHourStart' id='' onChange={this.handleHoursBox} >
                                    <option value='' name = 'scheduleHourStart'>Seleccione</option>
                                    {this.generateInitialHourOptions('scheduleHourStart').map((option) => option)
                                    }
                                </select>
                            </div>
                            {errors.scheduleHourStart && <p className={style.Error}>{errors.scheduleHourStart}</p>}
                            <div>
                                <h2>Hora final</h2>
                                <select name='scheduleHourFinish' id='' onChange={this.handleHoursBox}>
                                    <option value='' name ='scheduleHourFinish'>Seleccione</option>
                                    {this.generateFinalHourOptions('scheduleHourFinish').map((option) => option)
                                    }
                                </select>
                                {errors.scheduleHourFinish && <p className={style.Error}>{errors.scheduleHourFinish}</p>}
                            </div>
                        </div>

                        <div className={style.RightSubContainer}>
                            <h2>Días</h2>
                            <div className={style.DaysContainer}>
                                {weekDays.map((dia) => (
                                    <div key={dia}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={dia}
                                                checked={lessonAttributes.scheduleDays?.includes(dia)}
                                                name='scheduleDays'
                                                onChange={this.handleCheckBox}
                                            />
                                            <p>{dia}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.scheduleDays && <p className={style.Error}>{errors.scheduleDays}</p>}

                        </div>

                        <div className={style.RightSubContainer}>
                            <h2>Tipos de ejercicio</h2>
                            <div className={style.TiposDeEjercicio}>
                                {lessonsTypes.map((lesson, index) => (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={lesson}
                                                checked={lessonAttributes.types?.includes(lesson)}
                                                onChange={this.handleCheckBox}
                                                name='types'
                                            />
                                            <p>{lesson}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.types && <p className={style.Error}>{errors.types}</p>}

                        </div>
                        
                        <div className={`${style.RightSubContainer} `}>
                            <h2>Objetivos</h2>
                            <div className={style.TiposDeEjercicio}>
                                {lessonsGoals.map((lesson) => (
                                    <div key={lesson}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={lesson}
                                                name = 'goals'
                                                checked={lessonAttributes.goals?.includes(lesson)}
                                                onChange={this.handleCheckBox}
                                            />
                                            <p>{lesson}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className={`${style.RightSubContainer} ${style.LastSubContainer}`}>
                            <h2>Estatus de la clase</h2>
                            <select name='isAvailable' onChange={this.handleIsAvailable}>
                                <option>Seleccione</option>
                                {this.generateAvailableOptions()}
                            </select>
                        </div>
                        {errors.isAvailable && <p className={style.Error}>{errors.isAvailable}</p>}

                    </div>

                </div>
                <div className={style.ButtonContainer}>
                    <button className={this.state.allowSubmit === true ? style.SaveButton:`${style.SaveButton} ${style.Disable}`} onClick={this.handleConfirmModify} disabled={!this.state.allowSubmit}>
                        Guardar cambios
                    </button>

                    <button className={style.DeleteButton} onClick={this.handleConfirmRemove} disabled={!this.state.allowSubmit}>
                        Eliminar clase
                    </button>
                </div>


            </div>
            {this.state.message && 
                <div>
                    <div className={style.AdvertiseContainer} ></div>
                    <div className={style.Advertise}>
                        <h1>{this.state.message}</h1> 
                        <div>
                            {this.state.message &&<button className={style.AdvertiseButton1} onClick={this.handleConfirmarClick}>Confirmar</button>}
                            {this.state.message && <button className={style.AdvertiseButton2} onClick={this.handleVolverClick}>Volver</button>}
                        </div>
                    </div>
                </div>
                }

            {this.state.serverResponse && 
                <div>
                    <div className={style.AdvertiseContainer} ></div>
                    <div className={style.Advertise}>
                        <h1>{this.state.serverResponse}</h1>
                        <img className={style.CheckIcon} src={checkIcon} alt="" />
                        <div>
                            <a className={style.AdvertiseButton3} href='http://localhost:3000/dashboard/clases'>
                                Volver a Clases
                            </a>
                        </div>
                    </div>
                </div>
                }

                {this.state.serverErrorResponse && 
                <div>
                    <div className={style.AdvertiseContainer} ></div>
                    <div className={style.Advertise}>
                        <h1>{this.state.serverErrorResponse}</h1>
                        <img className={style.CheckIcon} src={crossIcon} alt="" />
                        <div>
                            <a className={style.AdvertiseButton3} href='http://localhost:3000/dashboard/clases'>
                                Volver a Clases
                            </a>
                        </div>
                    </div>
                </div>
                }
        </form>
      )  
    }
}


const mapStateToProps = (state) => {
    return {
        lesson: state.lessons.lesson,
        lessonsTypes: state.types.types,
        lessonsGoals: state.goals.goals,
        monitors: state.users.monitors,
        offices: state.offices.offices,
        status: state.lessons.status,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLessonsByID: (id) => dispatch(fetchLessonsByID(id)),
        fetchAllLessonTypes: () => dispatch(fetchAllLessonTypes()),
        fetchAllLessonGoals: () => dispatch(fetchAllLessonGoals()),
        fetchAllMonitors: () => dispatch(fetchAllMonitors()),
        fetchAllOffices: () => dispatch(fetchAllOffices()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailLessonDash);
