import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';

import {
  initializeApp,
  getApps,
} from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';


// =====================================================
// FIREBASE
// =====================================================
//
// COLOQUE AQUI OS DADOS DO SEU PROJETO FIREBASE
//

const firebaseConfig = {
  apiKey: "AIzaSyDr2Qsjny3ntiw43NX4NRoJnxtkjoT9A9c",
  authDomain: "apptel-ca125.firebaseapp.com",
  projectId: "apptel-ca125",
  storageBucket: "apptel-ca125.firebasestorage.app",
  messagingSenderId: "839806009073",
  appId: "1:839806009073:web:d733302ae153f3aff4b350",
  measurementId: "G-NJKYBQRWDH"
};
// Evita inicializar o Firebase duas vezes
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

// =====================================================
// TIPO DE USUÁRIO
// =====================================================

function TipoUsuario({ tipo, setTipo }) {
  return (
    <View style={styles.tipoContainer}>

      <TouchableOpacity
        style={[
          styles.tipoButton,
          tipo === 'Aluno' && styles.tipoSelecionado,
        ]}
        onPress={() => setTipo('Aluno')}
      >
        <Text
          style={[
            styles.tipoText,
            tipo === 'Aluno' && styles.tipoTextSelecionado,
          ]}
        >
          Aluno
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.tipoButton,
          tipo === 'Professor' && styles.tipoSelecionado,
        ]}
        onPress={() => setTipo('Professor')}
      >
        <Text
          style={[
            styles.tipoText,
            tipo === 'Professor' && styles.tipoTextSelecionado,
          ]}
        >
          Professor
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.tipoButton,
          tipo === 'Direção' && styles.tipoSelecionado,
        ]}
        onPress={() => setTipo('Direção')}
      >
        <Text
          style={[
            styles.tipoText,
            tipo === 'Direção' && styles.tipoTextSelecionado,
          ]}
        >
          Direção
        </Text>
      </TouchableOpacity>

    </View>
  );
}


// =====================================================
// TELA DE LOGIN
// =====================================================

function Login({
  email,
  setEmail,
  senha,
  setSenha,
  tipo,
  setTipo,
  mostrarSenha,
  setMostrarSenha,
  loading,
  entrar,
  irParaCadastro,
}) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.logo}>
          <Text style={styles.logoText}>
            SCF
          </Text>
        </View>


        <Text style={styles.title}>
          Bem-vindo de volta
        </Text>


        <Text style={styles.subtitle}>
          Sistema de Controle de Frequência
        </Text>


        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Login
          </Text>


          <Text style={styles.label}>
            Tipo de usuário
          </Text>


          <TipoUsuario
            tipo={tipo}
            setTipo={setTipo}
          />


          {/* =========================
              EMAIL
          ========================= */}

          <Text style={styles.label}>
            E-mail
          </Text>


          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textContentType="emailAddress"
          />


          {/* =========================
              SENHA
          ========================= */}

          <Text style={styles.label}>
            Senha
          </Text>


          <View style={styles.senhaContainer}>

            <TextInput
              style={[
                styles.input,
                styles.senhaInput,
              ]}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={(texto) => {
                setSenha(texto);
              }}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              textContentType="password"
            />


            <TouchableOpacity
              style={styles.mostrarButton}
              onPress={() =>
                setMostrarSenha(!mostrarSenha)
              }
            >
              <Text style={styles.mostrarText}>
                {mostrarSenha
                  ? 'Ocultar'
                  : 'Mostrar'}
              </Text>
            </TouchableOpacity>

          </View>


          <TouchableOpacity
            style={styles.esqueciButton}
            onPress={() =>
              Alert.alert(
                'Recuperar senha',
                'A recuperação de senha será implementada posteriormente.'
              )
            }
          >
            <Text style={styles.linkText}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.mainButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={entrar}
            disabled={loading}
          >

            {loading ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text style={styles.mainButtonText}>
                Entrar
              </Text>
            )}

          </TouchableOpacity>


          <View style={styles.footerRow}>

            <Text style={styles.footerText}>
              Ainda não possui uma conta?
            </Text>


            <TouchableOpacity
              onPress={irParaCadastro}
            >
              <Text style={styles.linkText}>
                {' '}Cadastre-se
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


// =====================================================
// CADASTRO
// =====================================================

function Cadastro({
  nome,
  setNome,
  email,
  setEmail,
  senha,
  setSenha,
  confirmarSenha,
  setConfirmarSenha,
  tipo,
  setTipo,
  mostrarSenha,
  setMostrarSenha,
  loading,
  cadastrar,
  voltarLogin,
}) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        <TouchableOpacity
          style={styles.voltarButton}
          onPress={voltarLogin}
        >
          <Text style={styles.voltarText}>
            ← Voltar para o login
          </Text>
        </TouchableOpacity>


        <View style={styles.logo}>
          <Text style={styles.logoText}>
            SCF
          </Text>
        </View>


        <Text style={styles.title}>
          Criar conta
        </Text>


        <Text style={styles.subtitle}>
          Cadastre-se para acessar o sistema
        </Text>


        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Cadastro
          </Text>


          {/* NOME */}

          <Text style={styles.label}>
            Nome completo
          </Text>


          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
            }}
            autoCapitalize="words"
            autoCorrect={false}
            spellCheck={false}
          />


          {/* TIPO */}

          <Text style={styles.label}>
            Tipo de usuário
          </Text>


          <TipoUsuario
            tipo={tipo}
            setTipo={setTipo}
          />


          {/* EMAIL */}

          <Text style={styles.label}>
            E-mail
          </Text>


          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textContentType="emailAddress"
          />


          {/* SENHA */}

          <Text style={styles.label}>
            Senha
          </Text>


          <View style={styles.senhaContainer}>

            <TextInput
              style={[
                styles.input,
                styles.senhaInput,
              ]}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={(texto) => {
                setSenha(texto);
              }}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              textContentType="newPassword"
            />


            <TouchableOpacity
              style={styles.mostrarButton}
              onPress={() =>
                setMostrarSenha(!mostrarSenha)
              }
            >
              <Text style={styles.mostrarText}>
                {mostrarSenha
                  ? 'Ocultar'
                  : 'Mostrar'}
              </Text>
            </TouchableOpacity>

          </View>


          {/* CONFIRMAR SENHA */}

          <Text style={styles.label}>
            Confirmar senha
          </Text>


          <TextInput
            style={styles.input}
            placeholder="Digite a senha novamente"
            placeholderTextColor="#999"
            value={confirmarSenha}
            onChangeText={(texto) => {
              setConfirmarSenha(texto);
            }}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textContentType="newPassword"
          />


          <TouchableOpacity
            style={[
              styles.mainButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={cadastrar}
            disabled={loading}
          >

            {loading ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text style={styles.mainButtonText}>
                Criar conta
              </Text>
            )}

          </TouchableOpacity>


          <View style={styles.footerRow}>

            <Text style={styles.footerText}>
              Já possui uma conta?
            </Text>


            <TouchableOpacity
              onPress={voltarLogin}
            >
              <Text style={styles.linkText}>
                {' '}Entrar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


// =====================================================
// ÁREA DO ALUNO
// =====================================================

function Aluno({ sair, nomeUsuario }) {

  const [aba, setAba] = useState('inicio');

  return (
    <View style={styles.areaContainer}>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >

        <View style={styles.areaHeader}>

          <View>

            <Text style={styles.areaSmallTitle}>
              SCF-AE
            </Text>

            <Text style={styles.areaTitle}>
              Área do Aluno
            </Text>

          </View>


          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              A
            </Text>
          </View>

        </View>


        {aba === 'inicio' && (
          <>

            <View style={styles.welcomeBox}>

              <Text style={styles.welcomeTitle}>
                Olá, {nomeUsuario || 'Aluno'}! 👋
              </Text>

              <Text style={styles.welcomeText}>
                Acompanhe suas atividades,
                frequência e certificados.
              </Text>

            </View>


            <View style={styles.statsContainer}>

              <View style={styles.statCard}>

                <Text style={styles.statNumber}>
                  04
                </Text>

                <Text style={styles.statLabel}>
                  Atividades
                </Text>

              </View>


              <View style={styles.statCard}>

                <Text style={styles.statNumber}>
                  92%
                </Text>

                <Text style={styles.statLabel}>
                  Frequência
                </Text>

              </View>


              <View style={styles.statCard}>

                <Text style={styles.statNumber}>
                  02
                </Text>

                <Text style={styles.statLabel}>
                  Certificados
                </Text>

              </View>

            </View>


            <Text style={styles.sectionTitle}>
              Acesso rápido
            </Text>


            <TouchableOpacity
              style={styles.menuCard}
              onPress={() =>
                setAba('atividades')
              }
            >

              <View style={styles.menuIcon}>
                <Text style={styles.iconText}>
                  📚
                </Text>
              </View>


              <View style={styles.menuContent}>

                <Text style={styles.menuTitle}>
                  Minhas atividades
                </Text>

                <Text style={styles.menuDescription}>
                  Veja as atividades e oficinas
                  disponíveis.
                </Text>

              </View>


              <Text style={styles.arrow}>
                ›
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.menuCard}
              onPress={() =>
                setAba('frequencia')
              }
            >

              <View style={styles.menuIcon}>
                <Text style={styles.iconText}>
                  ✓
                </Text>
              </View>


              <View style={styles.menuContent}>

                <Text style={styles.menuTitle}>
                  Minha frequência
                </Text>

                <Text style={styles.menuDescription}>
                  Consulte sua presença nas
                  atividades.
                </Text>

              </View>


              <Text style={styles.arrow}>
                ›
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.menuCard}
              onPress={() =>
                setAba('certificados')
              }
            >

              <View style={styles.menuIcon}>
                <Text style={styles.iconText}>
                  🏆
                </Text>
              </View>


              <View style={styles.menuContent}>

                <Text style={styles.menuTitle}>
                  Meus certificados
                </Text>

                <Text style={styles.menuDescription}>
                  Consulte seus certificados
                  de participação.
                </Text>

              </View>


              <Text style={styles.arrow}>
                ›
              </Text>

            </TouchableOpacity>

          </>
        )}


        {aba === 'atividades' && (
          <View>

            <Text style={styles.sectionTitle}>
              Minhas atividades
            </Text>


            <View style={styles.activityCard}>

              <Text style={styles.activityTitle}>
                Oficina de Tecnologia
              </Text>

              <Text style={styles.activityInfo}>
                📅 10/09/2026
              </Text>

              <Text style={styles.activityInfo}>
                🕐 14:00
              </Text>

              <View style={styles.presencaBadge}>

                <Text style={styles.presencaText}>
                  Presença registrada
                </Text>

              </View>

            </View>

          </View>
        )}


        {aba === 'frequencia' && (
          <View>

            <Text style={styles.sectionTitle}>
              Minha frequência
            </Text>


            <View style={styles.frequencyCard}>

              <Text style={styles.frequencyNumber}>
                92%
              </Text>

              <Text style={styles.frequencyLabel}>
                Frequência geral
              </Text>


              <View
                style={styles.progressBackground}
              >
                <View
                  style={styles.progress}
                />
              </View>


              <Text style={styles.frequencyInfo}>
                23 presenças de 25 atividades
              </Text>

            </View>

          </View>
        )}


        {aba === 'certificados' && (
          <View>

            <Text style={styles.sectionTitle}>
              Meus certificados
            </Text>


            <View style={styles.certificateCard}>

              <Text style={styles.certificateIcon}>
                🏆
              </Text>


              <View style={styles.menuContent}>

                <Text style={styles.menuTitle}>
                  Certificado de participação
                </Text>

                <Text style={styles.menuDescription}>
                  Oficina de Tecnologia
                </Text>

              </View>

            </View>

          </View>
        )}


        <TouchableOpacity
          style={styles.sairButton}
          onPress={sair}
        >
          <Text style={styles.sairText}>
            Sair da conta
          </Text>
        </TouchableOpacity>

      </ScrollView>


      <View style={styles.bottomMenu}>

        <TouchableOpacity
          onPress={() => setAba('inicio')}
        >
          <Text
            style={
              aba === 'inicio'
                ? styles.bottomActive
                : styles.bottomText
            }
          >
            🏠{'\n'}Início
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setAba('atividades')}
        >
          <Text
            style={
              aba === 'atividades'
                ? styles.bottomActive
                : styles.bottomText
            }
          >
            📚{'\n'}Atividades
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setAba('frequencia')}
        >
          <Text
            style={
              aba === 'frequencia'
                ? styles.bottomActive
                : styles.bottomText
            }
          >
            ✓{'\n'}Frequência
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setAba('certificados')}
        >
          <Text
            style={
              aba === 'certificados'
                ? styles.bottomActive
                : styles.bottomText
            }
          >
            🏆{'\n'}Certificados
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


// =====================================================
// PROFESSOR
// =====================================================

function Professor({ sair, nomeUsuario }) {

  return (
    <View style={styles.areaContainer}>

      <View style={styles.areaHeader}>

        <View>

          <Text style={styles.areaSmallTitle}>
            SCF-AE
          </Text>

          <Text style={styles.areaTitle}>
            Área do Professor
          </Text>

        </View>


        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            P
          </Text>
        </View>

      </View>


      <View style={styles.welcomeBox}>

        <Text style={styles.welcomeTitle}>
          Olá, {nomeUsuario || 'Professor'}! 👋
        </Text>

        <Text style={styles.welcomeText}>
          Gerencie suas atividades e
          solicitações.
        </Text>

      </View>


      <View style={styles.simpleCard}>

        <Text style={styles.simpleTitle}>
          Solicitações de transporte
        </Text>

        <Text style={styles.simpleText}>
          Crie e acompanhe suas solicitações
          para atividades extracurriculares.
        </Text>


        <TouchableOpacity
          style={styles.mainButton}
          onPress={() =>
            Alert.alert(
              'Nova solicitação',
              'Tela de solicitação será implementada.'
            )
          }
        >
          <Text style={styles.mainButtonText}>
            Nova solicitação
          </Text>
        </TouchableOpacity>

      </View>


      <TouchableOpacity
        style={styles.sairButton}
        onPress={sair}
      >
        <Text style={styles.sairText}>
          Sair da conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}


// =====================================================
// DIREÇÃO
// =====================================================

function Direcao({ sair, nomeUsuario }) {

  return (
    <View style={styles.areaContainer}>

      <View style={styles.areaHeader}>

        <View>

          <Text style={styles.areaSmallTitle}>
            SCF-AE
          </Text>

          <Text style={styles.areaTitle}>
            Área da Direção
          </Text>

        </View>


        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            D
          </Text>
        </View>

      </View>


      <View style={styles.welcomeBox}>

        <Text style={styles.welcomeTitle}>
          Olá, {nomeUsuario || 'Direção'}! 👋
        </Text>

        <Text style={styles.welcomeText}>
          Gerencie as atividades e solicitações
          do sistema.
        </Text>

      </View>


      <View style={styles.simpleCard}>

        <Text style={styles.simpleTitle}>
          Solicitações pendentes
        </Text>

        <Text style={styles.simpleNumber}>
          05
        </Text>

        <Text style={styles.simpleText}>
          Solicitações aguardando análise.
        </Text>


        <TouchableOpacity
          style={styles.mainButton}
          onPress={() =>
            Alert.alert(
              'Solicitações',
              'Lista de solicitações será implementada.'
            )
          }
        >
          <Text style={styles.mainButtonText}>
            Ver solicitações
          </Text>
        </TouchableOpacity>

      </View>


      <TouchableOpacity
        style={styles.sairButton}
        onPress={sair}
      >
        <Text style={styles.sairText}>
          Sair da conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}


// =====================================================
// APP
// =====================================================

export default function App() {

  const [tela, setTela] = useState('login');


  // LOGIN

  const [emailLogin, setEmailLogin] =
    useState('');

  const [senhaLogin, setSenhaLogin] =
    useState('');

  const [tipoLogin, setTipoLogin] =
    useState('Aluno');

  const [mostrarSenhaLogin, setMostrarSenhaLogin] =
    useState(false);

  const [loadingLogin, setLoadingLogin] =
    useState(false);


  // CADASTRO

  const [nome, setNome] =
    useState('');

  const [emailCadastro, setEmailCadastro] =
    useState('');

  const [senhaCadastro, setSenhaCadastro] =
    useState('');

  const [confirmarSenha, setConfirmarSenha] =
    useState('');

  const [tipoCadastro, setTipoCadastro] =
    useState('Aluno');

  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] =
    useState(false);

  const [loadingCadastro, setLoadingCadastro] =
    useState(false);


  // USUÁRIO LOGADO

  const [nomeUsuario, setNomeUsuario] =
    useState('');


  // =====================================================
  // LOGIN FIREBASE
  // =====================================================

  const entrar = async () => {

    const email = emailLogin.trim();

    if (!email) {
      Alert.alert(
        'Atenção',
        'Digite seu e-mail.'
      );
      return;
    }


    if (!email.includes('@')) {
      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido.'
      );
      return;
    }


    if (!senhaLogin) {
      Alert.alert(
        'Atenção',
        'Digite sua senha.'
      );
      return;
    }


    setLoadingLogin(true);


    try {

      const resultado =
        await signInWithEmailAndPassword(
          auth,
          email,
          senhaLogin
        );


      const uid = resultado.user.uid;


      // Busca o perfil no Firestore

      const usuarioRef =
        doc(db, 'usuarios', uid);

      const usuarioSnap =
        await getDoc(usuarioRef);


      if (!usuarioSnap.exists()) {

        setLoadingLogin(false);

        Alert.alert(
          'Erro',
          'Perfil do usuário não encontrado.'
        );

        return;
      }


      const dados =
        usuarioSnap.data();


      setNomeUsuario(
        dados.nome || ''
      );


      setTipoLogin(
        dados.tipo || 'Aluno'
      );


      setLoadingLogin(false);


      if (dados.tipo === 'Aluno') {

        setTela('aluno');

      } else if (
        dados.tipo === 'Professor'
      ) {

        setTela('professor');

      } else if (
        dados.tipo === 'Direção'
      ) {

        setTela('direcao');

      } else {

        Alert.alert(
          'Erro',
          'Tipo de usuário inválido.'
        );
      }


    } catch (error) {

      setLoadingLogin(false);

      console.log(
        'ERRO FIREBASE LOGIN:',
        error.code,
        error.message
      );


      if (
        error.code ===
        'auth/invalid-credential'
      ) {

        Alert.alert(
          'Login inválido',
          'E-mail ou senha incorretos.'
        );

      } else if (
        error.code ===
        'auth/invalid-email'
      ) {

        Alert.alert(
          'E-mail inválido',
          'Digite um e-mail válido.'
        );

      } else if (
        error.code ===
        'auth/user-not-found'
      ) {

        Alert.alert(
          'Usuário não encontrado',
          'Não existe uma conta com esse e-mail.'
        );

      } else if (
        error.code ===
        'auth/wrong-password'
      ) {

        Alert.alert(
          'Senha incorreta',
          'A senha informada está incorreta.'
        );

      } else {

        Alert.alert(
          'Erro',
          error.message
        );
      }
    }
  };


  // =====================================================
  // CADASTRO FIREBASE
  // =====================================================

  const cadastrar = async () => {

    const nomeLimpo =
      nome.trim();

    const emailLimpo =
      emailCadastro.trim();


    if (!nomeLimpo) {

      Alert.alert(
        'Atenção',
        'Digite seu nome completo.'
      );

      return;
    }


    if (!emailLimpo) {

      Alert.alert(
        'Atenção',
        'Digite seu e-mail.'
      );

      return;
    }


    if (!emailLimpo.includes('@')) {

      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido.'
      );

      return;
    }


    if (!senhaCadastro) {

      Alert.alert(
        'Atenção',
        'Digite uma senha.'
      );

      return;
    }


    if (senhaCadastro.length < 6) {

      Alert.alert(
        'Senha inválida',
        'A senha deve possuir pelo menos 6 caracteres.'
      );

      return;
    }


    if (!confirmarSenha) {

      Alert.alert(
        'Atenção',
        'Confirme sua senha.'
      );

      return;
    }


    if (
      senhaCadastro !==
      confirmarSenha
    ) {

      Alert.alert(
        'Senhas diferentes',
        'A senha e a confirmação precisam ser iguais.'
      );

      return;
    }


    setLoadingCadastro(true);


    try {

      // Cria a conta no Authentication

      const resultado =
        await createUserWithEmailAndPassword(
          auth,
          emailLimpo,
          senhaCadastro
        );


      const uid =
        resultado.user.uid;


      // Salva os dados no Firestore

      await setDoc(
        doc(
          db,
          'usuarios',
          uid
        ),
        {
          uid: uid,
          nome: nomeLimpo,
          email: emailLimpo,
          tipo: tipoCadastro,
          criadoEm:
            new Date().toISOString(),
        }
      );


      // Sai da conta criada para
      // voltar para a tela de login

      await signOut(auth);


      setLoadingCadastro(false);


      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {

              setEmailLogin(
                emailLimpo
              );

              setSenhaLogin('');

              setTipoLogin(
                tipoCadastro
              );

              setNome('');

              setEmailCadastro('');

              setSenhaCadastro('');

              setConfirmarSenha('');

              setTela('login');

            },
          },
        ]
      );


    } catch (error) {

      setLoadingCadastro(false);


      console.log(
        'ERRO FIREBASE CADASTRO:',
        error.code,
        error.message
      );


      if (
        error.code ===
        'auth/email-already-in-use'
      ) {

        Alert.alert(
          'E-mail já cadastrado',
          'Já existe uma conta usando este e-mail.'
        );

      } else if (
        error.code ===
        'auth/invalid-email'
      ) {

        Alert.alert(
          'E-mail inválido',
          'Digite um e-mail válido.'
        );

      } else if (
        error.code ===
        'auth/weak-password'
      ) {

        Alert.alert(
          'Senha fraca',
          'A senha deve possuir pelo menos 6 caracteres.'
        );

      } else {

        Alert.alert(
          'Erro no cadastro',
          error.message
        );
      }
    }
  };


  // =====================================================
  // SAIR
  // =====================================================

  const sair = async () => {

    try {

      await signOut(auth);

      setEmailLogin('');
      setSenhaLogin('');
      setNomeUsuario('');

      setTela('login');

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível sair da conta.'
      );

    }
  };


  // =====================================================
  // TELAS
  // =====================================================

  if (tela === 'login') {

    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F8FC"
        />

        <Login
          email={emailLogin}
          setEmail={setEmailLogin}
          senha={senhaLogin}
          setSenha={setSenhaLogin}
          tipo={tipoLogin}
          setTipo={setTipoLogin}
          mostrarSenha={
            mostrarSenhaLogin
          }
          setMostrarSenha={
            setMostrarSenhaLogin
          }
          loading={loadingLogin}
          entrar={entrar}
          irParaCadastro={() =>
            setTela('cadastro')
          }
        />

      </>
    );
  }


  if (tela === 'cadastro') {

    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F8FC"
        />

        <Cadastro
          nome={nome}
          setNome={setNome}
          email={emailCadastro}
          setEmail={setEmailCadastro}
          senha={senhaCadastro}
          setSenha={setSenhaCadastro}
          confirmarSenha={
            confirmarSenha
          }
          setConfirmarSenha={
            setConfirmarSenha
          }
          tipo={tipoCadastro}
          setTipo={setTipoCadastro}
          mostrarSenha={
            mostrarSenhaCadastro
          }
          setMostrarSenha={
            setMostrarSenhaCadastro
          }
          loading={loadingCadastro}
          cadastrar={cadastrar}
          voltarLogin={() =>
            setTela('login')
          }
        />

      </>
    );
  }


  if (tela === 'aluno') {

    return (
      <Aluno
        sair={sair}
        nomeUsuario={nomeUsuario}
      />
    );
  }


  if (tela === 'professor') {

    return (
      <Professor
        sair={sair}
        nomeUsuario={nomeUsuario}
      />
    );
  }


  if (tela === 'direcao') {

    return (
      <Direcao
        sair={sair}
        nomeUsuario={nomeUsuario}
      />
    );
  }


  return null;
}


// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 17,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 7,
  },

  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },

  senhaContainer: {
    position: 'relative',
  },

  senhaInput: {
    paddingRight: 80,
  },

  mostrarButton: {
    position: 'absolute',
    right: 14,
    top: 14,
  },

  mostrarText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 13,
  },

  tipoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  tipoButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 9,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 3,
  },

  tipoSelecionado: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },

  tipoText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
  },

  tipoTextSelecionado: {
    color: '#4F46E5',
  },

  esqueciButton: {
    alignSelf: 'flex-end',
    marginVertical: 14,
  },

  linkText: {
    color: '#4F46E5',
    fontWeight: '700',
  },

  mainButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },

  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },

  voltarButton: {
    marginBottom: 20,
  },

  voltarText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },

  // ============================
  // ÁREA DO USUÁRIO
  // ============================

  areaContainer: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 20,
  },

  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  areaSmallTitle: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 4,
  },

  areaTitle: {
    color: '#111827',
    fontSize: 25,
    fontWeight: '700',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  welcomeBox: {
    backgroundColor: '#4F46E5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 7,
  },

  welcomeText: {
    color: '#E0E7FF',
    fontSize: 14,
    lineHeight: 21,
  },

  statsContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
  },

  statNumber: {
    color: '#4F46E5',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 5,
  },

  statLabel: {
    color: '#6B7280',
    fontSize: 11,
    textAlign: 'center',
  },

  sectionTitle: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  menuIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  iconText: {
    fontSize: 20,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  menuDescription: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 17,
  },

  arrow: {
    color: '#9CA3AF',
    fontSize: 27,
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
  },

  activityTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  activityInfo: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 6,
  },

  presencaBadge: {
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },

  presencaText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },

  frequencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    elevation: 2,
  },

  frequencyNumber: {
    color: '#4F46E5',
    fontSize: 48,
    fontWeight: '800',
  },

  frequencyLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 20,
  },

  progressBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progress: {
    width: '92%',
    height: '100%',
    backgroundColor: '#4F46E5',
  },

  frequencyInfo: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 12,
  },

  certificateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  certificateIcon: {
    fontSize: 35,
    marginRight: 15,
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 8,
  },

  bottomText: {
    color: '#9CA3AF',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 17,
  },

  bottomActive: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 17,
  },

  sairButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },

  sairText: {
    color: '#EF4444',
    fontWeight: '700',
  },

  simpleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    elevation: 3,
  },

  simpleTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  simpleNumber: {
    color: '#4F46E5',
    fontSize: 40,
    fontWeight: '800',
    marginVertical: 10,
  },

  simpleText: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 21,
  },

});