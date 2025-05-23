import { colors, createTheme } from '@mui/material';
import { alpha } from "@mui/material";

const neutral = {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
};

const text = {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: alpha('#374151', 0.48),
};

const primary = {
    main: '#086fe2',
    light: '#459AFAFF',
    dark: '#05203c',
    contrastText: '#FFFFFF'
};

const secondary = {
    main: '#E73A78',
    light: '#FF71A4',
    dark: '#C7285E',
    contrastText: '#FFFFFF'
};

const tertiary = {
    main: neutral[300],
    light: alpha('#374151', 0.12),
    dark: neutral[400],
    contrastText: text.primary
};

const success = {
    main: '#14B8A6',
    light: '#43C6B7',
    dark: '#0E8074',
    contrastText: '#FFFFFF'
};

const info = {
    main: '#64B6F7',
    light: '#83C4F8',
    dark: '#467FAC',
    contrastText: '#FFFFFF'
};

const warning = {
    main: '#FFB020',
    light: '#FFBF4C',
    dark: '#845B10',
    contrastText: '#FFFFFF'
};

const error = {
    main: '#D14343',
    light: '#DA6868',
    dark: '#922E2E',
    contrastText: '#FFFFFF'
};

const action = {
    active: '#6B7280',
    hover: alpha('#374151', 0.04),
};

const grey = {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#D5D5D5',
    A200: '#AAAAAA',
    A400: '#616161',
    A700: '#303030',
}

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 300,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '&.MuiButton-containedTertiary': {
                        color: text.primary
                    },
                    '&.MuiButton-textTertiary': {
                        color: text.primary
                    },
                    '&.MuiButton-outlinedTertiary': {
                        color: text.primary,
                        border: `1px solid ${grey[400]}`,
                        '&:hover': {
                            backgroundColor: action.hover,
                            color: text.primary,
                        },
                    }
                },
                sizeSmall: {
                    height: '34px'
                },
                sizeMedium: {
                    height: '40px'
                },
                sizeLarge: {
                    height: '48px'
                },
                textSizeSmall: {
                    height: '34px'
                },
                textSizeMedium: {
                    height: '40px'
                },
                textSizeLarge: {
                    height: '48px'
                }
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            },
            styleOverrides: {
                root: {
                    color: text.primary,

                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    "@media print": {
                        border: "1px solid #C8C8D3",
                        borderRadius: "4px",
                        boxShadow: "none"
                    }
                }

            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px'
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6'
                },
                subheaderTypographyProps: {
                    variant: 'body2'
                }
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: '#E6E8F0'
                },
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: text.secondary
                },
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F3F4F6',
                    '.MuiTableCell-root': {
                        color: '#374151'
                    },
                    borderBottom: 'none',
                    '& .MuiTableCell-root': {
                        borderBottom: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    },
                    '& .MuiTableCell-paddingCheckbox': {
                        paddingTop: 4,
                        paddingBottom: 4
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    "&.MuiChip-colorWarning": {
                        backgroundColor: "#FFE4BD",
                        color: warning.dark
                    },
                    "&.MuiChip-colorSuccess": {
                        backgroundColor: "#E7F8F6",
                        color: success.dark,
                    },
                    "&.MuiChip-colorError": {
                        backgroundColor: "#F6DADA",
                        color: error.dark
                    }
                }
            }
        }
    },
    palette: {
        action,
        background: {
            default: colors.common.white,
            dark: '#f4f6f8',
            paper: colors.common.white
        },
        error,
        info,
        primary,
        secondary,
        success,
        text,
        warning,
        grey,
        neutral,
        tertiary,
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: "Relative",
        button: {
            fontWeight: 440,
            fontSize: '0.875rem',
            lineHeight: 1,
            letterSpacing: '1px'
        },
        h1: {
            fontWeight: 600,
            fontSize: 64,
            letterSpacing: '-1.5px',
            lineHeight: '51px',
            color: 'palette.text.primary'
        },
        h2: {
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: '-0.5px',
            lineHeight: '38px',
            color: 'textPrimary'
        },
        h3: {
            fontWeight: 600,
            fontSize: 16,
        },
        h4: {
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: '0.25px',
            lineHeight: '26px',
            color: 'textPrimary'
        },
        h5: {
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '22px',
            color: 'textPrimary'
        },
        h6: {
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.15px',
            lineHeight: '20px',
            color: 'textPrimary'
        },
        subtitle1: {
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0.15px',
            lineHeight: '28px',
            color: 'textPrimary'
        },
        subtitle2: {
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.1px',
            lineHeight: '21px',
            color: 'textPrimary'
        },
        body1: {
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0.15px',
            lineHeight: '24px',
            color: 'textSecondary'
        },
        body2: {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: '0.15px',
            lineHeight: '20px',
            color: 'textSecondary'
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.4px',
            lineHeight: 'auto',
            color: 'textPrimary'
        },
        overline: {
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '1px',
            lineHeight: '31px',
            color: 'textPrimary'
        },
    }
});
export default theme;
