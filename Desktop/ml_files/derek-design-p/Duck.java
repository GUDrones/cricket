public abstract class Duck {
    String name;
    FlyBehaviour flyBehaviour;

    public Duck(String name, FlyBehaviour flyBehaviour) {
        this.name = name;
        this.flyBehaviour = flyBehaviour;
    }

    public void fly() {
        flyBehaviour.fly(name);
    }

    public void setFlyBehaviour(String name, FlyBehaviour flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    }
}