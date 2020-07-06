const createLabel = (scene, text) => scene.rexUI.add.label({
  width: 40,
  height: 40,

  background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x607D3B),

  text: scene.add.text(0, 0, text, {
    fontSize: '24px',
  }),

  space: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
});
export default createLabel;