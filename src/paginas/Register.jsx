import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://13.58.169.56/crear_usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: name,
                    correo: email,
                    telefono: telefono,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('🦾 Registro exitoso! Redirigiendo...', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(`💥 ${data.message || 'Error al registrar usuario'}`, {
                    position: "top-center",
                    theme: "dark",
                });
            }
        } catch (err) {
            toast.error('⚠️ Error de conexión con el servidor', {
                position: "top-center",
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.cyberContainer}>
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.glassCard}
            >
                <motion.div
                    style={styles.header}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={styles.logo}>NUEVO USUARIO</div>
                    <h2 style={styles.title}>REGISTRO DEL SISTEMA</h2>
                    <div style={styles.version}>v2.4.1</div>
                </motion.div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <motion.div
                        style={styles.inputGroup}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label style={styles.inputLabel}>NOMBRE COMPLETO</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.cyberInput}
                            placeholder="EJ: JUAN PÉREZ"
                        />
                        <div style={styles.inputUnderline}></div>
                    </motion.div>

                    <motion.div
                        style={styles.inputGroup}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label style={styles.inputLabel}>CORREO ELECTRÓNICO</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.cyberInput}
                            placeholder="USUARIO@DOMINIO.COM"
                        />
                        <div style={styles.inputUnderline}></div>
                    </motion.div>

                    <motion.div
                        style={styles.inputGroup}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label style={styles.inputLabel}>TELÉFONO</label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            style={styles.cyberInput}
                            placeholder="EJ: 5512345678"
                        />
                        <div style={styles.inputUnderline}></div>
                    </motion.div>

                    <motion.div
                        style={styles.inputGroup}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label style={styles.inputLabel}>CONTRASEÑA</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.cyberInput}
                            placeholder="••••••••"
                        />
                        <div style={styles.inputUnderline}></div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {isSubmitting ? (
                            <div style={styles.buttonContent}>
                                <motion.div
                                    style={styles.buttonSpinner}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                PROCESANDO...
                            </div>
                        ) : 'CREAR CUENTA'}
                    </motion.button>
                </form>
            </motion.div>

            <div style={styles.cornerDecoration}></div>
            <div style={styles.gridBackground}></div>
            <div style={styles.scanLine}></div>
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
        width: '100%',
        maxWidth: '500px',
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
    logo: {
        position: 'absolute',
        top: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#0a0a12',
        color: '#00f0ff',
        padding: '0 20px',
        fontSize: '14px',
        letterSpacing: '3px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#00f0ff',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        letterSpacing: '2px',
        marginBottom: '5px',
    },
    version: {
        fontSize: '12px',
        color: '#7f8c8d',
        letterSpacing: '1px',
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
    submitButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        border: '1px solid #00f0ff',
        borderRadius: '8px',
        fontSize: '16px',
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
        width: '100%',
        padding: '15px',
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
        color: '#666666',
        border: '1px solid #444444',
        borderRadius: '8px',
        fontSize: '16px',
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
        width: '18px',
        height: '18px',
        border: '2px solid rgba(0, 240, 255, 0.3)',
        borderTopColor: '#00f0ff',
        borderRadius: '50%',
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
    scanLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(0, 240, 255, 0.5)',
        boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
        animation: 'scan 4s linear infinite',
        zIndex: 2,
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes scan': {
        '0%': { top: '-2px' },
        '100%': { top: '100%' },
    },
};

export default Register;