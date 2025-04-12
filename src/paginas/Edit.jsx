import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        nombre: '', 
        correo: '', 
        telefono: '' 
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://13.58.169.56/usuarios/${id}`);
                
                if (!response.ok) throw new Error('Error 404: Usuario no encontrado');
                
                const data = await response.json();
                setForm(data);
            } catch (error) {
                toast.error(error.message);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`https://13.58.169.56/usuarios/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error('Error al conectar con el servidor');
            
            toast.success('✅ Datos actualizados con éxito');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            toast.error(`🔥 Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.loadingScreen}>
                <div style={styles.holoLoader}></div>
                <p style={styles.loadingText}>CARGANDO DATOS...</p>
                <div style={styles.loadingBar}></div>
            </div>
        );
    }

    return (
        <div style={styles.cyberContainer}>
            <div style={styles.glassCard}>
                <div style={styles.header}>
                    <h2 style={styles.title}>EDITAR USUARIO</h2>
                    <div style={styles.idBadge}>ID: {id}</div>
                </div>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>NOMBRE</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            style={styles.cyberInput}
                            placeholder="EJ: JUAN PÉREZ"
                        />
                        <div style={styles.inputUnderline}></div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>CORREO</label>
                        <input
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                            required
                            style={styles.cyberInput}
                            placeholder="EJ: USUARIO@DOMINIO.COM"
                        />
                        <div style={styles.inputUnderline}></div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>TELÉFONO</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                            style={styles.cyberInput}
                            placeholder="EJ: 5512345678"
                        />
                        <div style={styles.inputUnderline}></div>
                    </div>
                    
                    <div style={styles.buttonGroup}>
                        <button 
                            type="button" 
                            onClick={() => navigate('/')}
                            style={styles.cancelButton}
                        >
                            CANCELAR
                        </button>
                        <button 
                            type="submit" 
                            style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span style={styles.buttonContent}>
                                    <span style={styles.buttonSpinner}></span>
                                    PROCESANDO...
                                </span>
                            ) : 'ACTUALIZAR DATOS'}
                        </button>
                    </div>
                </form>
            </div>
            
            <div style={styles.cornerDecoration}></div>
            <div style={styles.gridBackground}></div>
        </div>
    );
};

const styles = {
    cyberContainer: {
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a12',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Courier New', monospace",
    },
    gridBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
            linear-gradient(rgba(20, 20, 40, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 40, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
    },
    glassCard: {
        position: 'relative',
        width: '90%',
        maxWidth: '600px',
        backgroundColor: 'rgba(20, 20, 40, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(100, 100, 200, 0.2)',
        boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(100, 150, 255, 0.1)
        `,
        padding: '40px',
        zIndex: 1,
    },
    header: {
        marginBottom: '40px',
        textAlign: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#00f0ff',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        letterSpacing: '2px',
        marginBottom: '10px',
    },
    idBadge: {
        display: 'inline-block',
        padding: '5px 15px',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        borderRadius: '20px',
        fontSize: '14px',
        border: '1px solid rgba(0, 240, 255, 0.3)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    inputGroup: {
        position: 'relative',
    },
    inputLabel: {
        display: 'block',
        marginBottom: '8px',
        color: '#00f0ff',
        fontSize: '14px',
        letterSpacing: '1px',
    },
    cyberInput: {
        width: '100%',
        padding: '15px 0',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(100, 150, 255, 0.3)',
        color: '#ffffff',
        fontSize: '16px',
        outline: 'none',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':focus': {
            borderBottomColor: '#00f0ff',
        },
    },
    inputUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 0,
        height: '2px',
        backgroundColor: '#00f0ff',
        transition: 'width 0.3s ease',
    },
    buttonGroup: {
        display: 'flex',
        gap: '15px',
        marginTop: '40px',
    },
    cancelButton: {
        flex: 1,
        padding: '15px',
        backgroundColor: 'transparent',
        color: '#ff3366',
        border: '1px solid #ff3366',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 51, 102, 0.1)',
            boxShadow: '0 0 10px rgba(255, 51, 102, 0.3)',
        },
    },
    submitButton: {
        flex: 2,
        padding: '15px',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        border: '1px solid #00f0ff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.2)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
        },
    },
    submitButtonDisabled: {
        flex: 2,
        padding: '15px',
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
        color: '#666666',
        border: '1px solid #444444',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'not-allowed',
        letterSpacing: '1px',
    },
    buttonContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    buttonSpinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(0, 240, 255, 0.3)',
        borderTopColor: '#00f0ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    cornerDecoration: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: '100px',
        height: '100px',
        borderRight: '2px solid rgba(0, 240, 255, 0.3)',
        borderBottom: '2px solid rgba(0, 240, 255, 0.3)',
    },
    loadingScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a12',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    holoLoader: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid transparent',
        borderTopColor: '#00f0ff',
        borderBottomColor: '#ff3366',
        animation: 'spin 1.5s linear infinite',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
    },
    loadingText: {
        marginTop: '30px',
        color: '#00f0ff',
        fontSize: '16px',
        letterSpacing: '3px',
    },
    loadingBar: {
        width: '200px',
        height: '2px',
        backgroundColor: 'rgba(100, 150, 255, 0.2)',
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden',
        ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            backgroundColor: '#00f0ff',
            animation: 'loading 2s ease-in-out infinite',
        },
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes loading': {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(200%)' },
    },
};

export default Edit;