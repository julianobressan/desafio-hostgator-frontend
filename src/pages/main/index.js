import React, { Component } from "react";
import api from "../../services/api";
import "../../styles/style.css";

export default class Main extends Component {
  state = {
    plan: [],
    monthly: [],
    annually: [],
    trienally: [],
    selected: "trienally",
    discount: 0.4,
    promocode: "PROMOHG40"
  };
  
  componentDidMount() {
    this.loadCycles();
  }

  loadCycles = async (periodicity) => {
      console.log(periodicity);
    const response = await api.get("/prices/6");
    this.setState({
      plan: response.data,
      monthly: response.data.cycles.monthly,
      annually: response.data.cycles.annually,
      trienally: response.data.cycles.trienally,      
    });
  };

  handleOptionChange = (changeEvent) => {
        const selected = changeEvent.target.value;
        this.setState({
        selected
        });
  };

  format(number) {
    let formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(number);
  }

  render() {
    if (!this.state.plan.cycles) {
      return null;
    }

    const { plan, monthly, annually, trienally } = this.state;
    let priceOrder = 0;
    let months = 1;
    switch (this.state.selected) {
      case "trienally":
        priceOrder = trienally.priceOrder;
        months = trienally.months;
        break;
      case "annually":
        priceOrder = annually.priceOrder;
        months = annually.months;
        break;
      case "monthly":
        priceOrder = monthly.priceOrder;
        months = monthly.months;
        break;
      default:
        break;
    }
    const newPrice = priceOrder - priceOrder * this.state.discount;
    const mensalPrice = newPrice / months;
    const discount = priceOrder - newPrice;
    const url = `?a=add&pid=${this.state.plan.id}&billingcycle=${this.state.selected}&promocode=${this.state.promocode}`;
    return (
      <section>
        <div className="period">
          <div className="period-title">Quero pagar a cada:</div>
          <div className="period-selector">
            <div className="period-selector-radius">
              <div className="period-selector-1">
                <label className="container-blue">
                  3 anos
                  <input
                    type="radio"
                    checked={this.state.selected === 'trienally'}
                    id="rdPeriodicity1"
                    name="radio"
                    value="trienally"
                    onChange={this.handleOptionChange}
                  />
                  <span className="checkmark-blue"></span>
                </label>
              </div>
              <div className="period-selector-2">
                <label className="container">
                  1 ano
                  <input
                    type="radio"
                    checked={this.state.selected === 'annually'}
                    id="rdPeriodicity2"
                    name="radio"
                    value="annually"
                    onChange={this.handleOptionChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="period-selector-3">
                <label className="container">
                  1 mês
                  <input
                    type="radio"
                    checked={this.state.selected === 'monthly'}
                    id="rdPeriodicity3"
                    name="radio"
                    value="monthly"
                    onChange={this.handleOptionChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-inside-top">
              <img src="/images/server.svg" alt="" />
              <br />
              <span id="planName">{plan.name}</span>
            </div>
            <div className="card-inside-middle">
              <div className="prices">
                <span id="priceOrder" className="old-price">
                  R$ {this.format(priceOrder)}
                </span>{" "}
                <span id="updatedPrice" className="new-price">
                  R$ {this.format(newPrice)}
                </span>
                <br />
                <span>equivalente a</span>
                <br />
                <span className="mensal-price">
                  R${" "}
                  <span id="mensalPrice" className="mensal-price-value">
                    {this.format(mensalPrice)}
                  </span>
                  /mês*
                </span>
              </div>

              <a className="button-contract" id="btnContractNow" href={url}>
                Contrate Agora
              </a>

              <div className="free-domain">
                1 ano de Domínio Grátis{" "}
                <img className="help" src="/images/info.svg" alt="" />
                <span className="tooltip">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus suscipit, ligula eget vestibulum gravida, ligula velit
                  facilisis massa, a egestas erat nunc ut nisl.
                </span>
              </div>
              <div className="economy">
                economize R$ <span id="discount">{this.format(discount)}</span>{" "}
                <span className="off">{this.state.discount * 100}% OFF</span>
              </div>
            </div>
            <div className="card-inside-bottom">
              <ul>
                <li>
                  <span className="underlined">
                    Sites Ilimitados
                    <span className="tooltip">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus suscipit, ligula eget vestibulum gravida, ligula
                      velit facilisis massa, a egestas erat nunc ut nisl.
                    </span>
                  </span>
                </li>
                <li>
                  <strong>100 GB</strong> de Armazenamento
                </li>
                <li>
                  <span className="underlined">
                    Contas de E-mail <strong>Ilimitadas</strong>
                    <span className="tooltip">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus suscipit, ligula eget vestibulum gravida, ligula
                      velit facilisis massa, a egestas erat nunc ut nisl.
                    </span>
                  </span>
                </li>
                <li>
                  Criador de Sites <span className="stronger-text">Grátis</span>
                </li>
                <li>
                  Certificado SSL <strong>Grátis</strong> (https)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
