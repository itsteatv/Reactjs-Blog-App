import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';

export default function FullscreenModal({ open, onClose, children }) {
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
            >
                <Zoom in={open}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, fontWeight: "bold" }}>
                            Close
                        </Button>
                        <img
                            src={children.props.src}
                            alt={children.props.alt}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                objectFit: 'contain',
                                width: "30rem",
                                maxWidth: '100%',
                            }}
                        />
                    </Box>
                </Zoom>
            </Modal>
        </>
    );
}
