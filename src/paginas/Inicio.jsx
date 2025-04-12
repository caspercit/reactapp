import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inicio = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://13.58.169.56/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.usuario));
                toast.success('🔒 Acceso concedido');
                setTimeout(() => navigate('/'), 1000);
            } else {
                throw new Error(data.message || 'Credenciales inválidas');
            }
        } catch (err) {
            toast.error(`⚠️ ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.cyberContainer}>
            <div style={styles.glassPanel}>
                <div style={styles.header}>
                    <div style={styles.logo}>SYSTEM</div>
                    <h2 style={styles.title}>ACCESO AL SISTEMA</h2>
                    <div style={styles.version}>v2.4.1</div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>CORREO ELECTRÓNICO</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="usuario@dominio.com"
                            style={styles.cyberInput}
                        />
                        <div style={styles.inputUnderline}></div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>CONTRASEÑA</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={styles.cyberInput}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={styles.eyeButton}
                            >
                                {showPassword ? '👁' : '👁‍🗨'}
                            </button>
                        </div>
                        <div style={styles.inputUnderline}></div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={isLoading ? styles.submitButtonDisabled : styles.submitButton}
                    >
                        {isLoading ? (
                            <span style={styles.buttonContent}>
                                <span style={styles.buttonSpinner}></span>
                                AUTENTICANDO...
                            </span>
                        ) : 'INGRESAR'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <Link to="/registro" style={styles.registerLink}>
                        ¿NO TIENES CUENTA? <span style={styles.registerHighlight}>REGÍSTRATE</span>
                    </Link>
                    <div style={styles.securityNote}>SISTEMA PROTEGIDO</div>
                </div>
            </div>

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
    glassPanel: {
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
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
        fontSize: '24px',
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
    passwordContainer: {
        position: 'relative',
    },
    eyeButton: {
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#00f0ff',
        cursor: 'pointer',
        fontSize: '18px',
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
        width: '16px',
        height: '16px',
        border: '2px solid rgba(0, 240, 255, 0.3)',
        borderTopColor: '#00f0ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    footer: {
        marginTop: '40px',
        textAlign: 'center',
    },
    registerLink: {
        color: '#7f8c8d',
        fontSize: '14px',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '20px',
    },
    registerHighlight: {
        color: '#ff3366',
        fontWeight: 'bold',
    },
    securityNote: {
        fontSize: '12px',
        color: 'rgba(0, 240, 255, 0.5)',
        letterSpacing: '1px',
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

export default Inicio;